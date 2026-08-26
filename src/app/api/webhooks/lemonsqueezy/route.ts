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
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const userId = customData.user_id;

    if (!userId) {
      console.log('Webhook received without user_id in custom_data. Ignoring.');
      return NextResponse.json({ message: 'No user_id found in custom_data' }, { status: 200 });
    }

    if (!supabaseServiceKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing on server environment!');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Fetch existing user to merge metadata
    const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId);
    if (getUserError || !userData?.user) {
      console.error('User not found in Supabase:', userId, getUserError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentMetadata = userData.user.user_metadata || {};
    const attributes = payload.data?.attributes || {};
    const status = attributes.status;
    const portalUrl = attributes.urls?.customer_portal;

    let updatedMetadata = { ...currentMetadata };

    // Determine if event pertains to Cloud Sync subscription or Pro purchase
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
      // Pro version or one-time purchase
      updatedMetadata.is_pro = true;
      updatedMetadata.license_key = attributes.order_number?.toString() || 'PRO_ACTIVATED';
    }

    // Save updated metadata back to Supabase user
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: updatedMetadata
    });

    if (updateError) {
      console.error('Failed to update user metadata:', updateError);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    console.log(`Successfully updated metadata for user ${userId}:`, updatedMetadata);
    return NextResponse.json({ success: true, metadata: updatedMetadata }, { status: 200 });

  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
