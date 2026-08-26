import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Supabase Admin Client using Service Role Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vctiukrmskxysaztftch.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || 'rhyme_secret_982371982371';

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify LemonSqueezy HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error('Signature mismatch on webhook request');
      return NextResponse.json({ 
        error: 'Invalid signature',
        message: 'The signature from LemonSqueezy did not match the secret on Vercel.',
        usedSecret: secret ? `${secret.substring(0, 5)}...` : 'none'
      }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const attributes = payload.data?.attributes || {};
    const userEmail = attributes.user_email || attributes.customer_email;

    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing on server environment!');
      return NextResponse.json({ 
        error: 'Server configuration error',
        message: 'SUPABASE_SERVICE_ROLE_KEY environment variable is NOT configured in Vercel!'
      }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    let targetUserId = customData.user_id;
    let userData = null;

    if (targetUserId) {
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(targetUserId);
      if (!error && data?.user) userData = data.user;
    }

    // Fallback: lookup by email if user_id is missing or invalid
    if (!userData && userEmail) {
      console.log('Searching for user by email fallback:', userEmail);
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (!error && data?.users) {
        const found = data.users.find(u => u.email?.toLowerCase() === userEmail.toLowerCase());
        if (found) {
          userData = found;
          targetUserId = found.id;
        }
      }
    }

    if (!userData || !targetUserId) {
      console.error('User not found by ID or Email:', { targetUserId, userEmail });
      return NextResponse.json({ error: 'User not found in Supabase' }, { status: 404 });
    }

    const currentMetadata = userData.user.user_metadata || {};
    const status = attributes.status;
    const portalUrl = attributes.urls?.customer_portal;

    let updatedMetadata = { ...currentMetadata };
    const productName = (attributes.first_order_item?.product_name || attributes.product_name || '').toLowerCase();
    const variantName = (attributes.first_order_item?.variant_name || attributes.variant_name || '').toLowerCase();
    const isCloudProduct = productName.includes('cloud') || variantName.includes('cloud');

    // Handle Subscription events
    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const isActive = status === 'active' || status === 'on_trial';
      updatedMetadata.cloud_sync_active = isActive;
      updatedMetadata.subscription_status = status;
      if (portalUrl) {
        updatedMetadata.customer_portal_url = portalUrl;
      }
    } else if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      updatedMetadata.cloud_sync_active = false;
      updatedMetadata.subscription_status = status || 'cancelled';
    } else if (eventName === 'order_created') {
      const isPaid = status === 'paid';
      if (isPaid) {
        if (isCloudProduct) {
          updatedMetadata.cloud_sync_active = true;
          updatedMetadata.subscription_status = 'active';
          if (portalUrl) updatedMetadata.customer_portal_url = portalUrl;
        } else {
          updatedMetadata.is_pro = true;
          updatedMetadata.license_key = attributes.order_number?.toString() || 'PRO_ACTIVATED';
        }
      }
    }

    // Save updated metadata back to Supabase user
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUserId, {
      user_metadata: updatedMetadata
    });

    if (updateError) {
      console.error('Failed to update user metadata:', updateError);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    console.log(`Successfully updated metadata for user ${targetUserId}:`, updatedMetadata);
    return NextResponse.json({ success: true, metadata: updatedMetadata }, { status: 200 });

  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
