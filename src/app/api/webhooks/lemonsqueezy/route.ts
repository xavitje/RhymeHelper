import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Supabase Admin Client using Service Role Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-signature');
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!secret) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify LemonSqueezy HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      console.error('Signature mismatch on webhook request');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const customData = payload.meta?.custom_data || {};
    const attributes = payload.data?.attributes || {};
    const userEmail = attributes.user_email || attributes.customer_email;

    if (!supabaseServiceKey || !supabaseUrl) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is missing on server environment!');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
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

    // Rechten (Pro / Cloud Sync) staan in app_metadata: alleen de server kan dat veld schrijven.
    // Tijdens de overgang naar app 1.4 schrijven we dezelfde vlaggen ook nog in user_metadata,
    // omdat app 1.3.0 daar kijkt. Zie claude/cloud-library-plan.md (C1).
    const status: string | undefined = attributes.status;
    const portalUrl: string | undefined = attributes.urls?.customer_portal;
    const endsAt: string | null = attributes.ends_at || null;
    const productName = (attributes.first_order_item?.product_name || attributes.product_name || '').toLowerCase();
    const variantName = (attributes.first_order_item?.variant_name || attributes.variant_name || '').toLowerCase();
    const isCloudProduct = productName.includes('cloud') || variantName.includes('cloud');

    const patch: Record<string, unknown> = {};

    if (eventName?.startsWith('subscription_')) {
      // Abonnement (Cloud Sync). "cancelled" = opgezegd maar loopt door tot ends_at.
      if (status === 'active' || status === 'on_trial' || status === 'past_due') {
        patch.cloud_sync_active = true;
        patch.cloud_sync_until = null;
      } else if (status === 'cancelled') {
        const stillRunning = endsAt ? new Date(endsAt).getTime() > Date.now() : false;
        patch.cloud_sync_active = stillRunning;
        patch.cloud_sync_until = endsAt;
      } else if (status) {
        // expired, unpaid, paused
        patch.cloud_sync_active = false;
        patch.cloud_sync_until = endsAt;
      }
      if (status) patch.subscription_status = status;
      if (portalUrl) patch.customer_portal_url = portalUrl;
    } else if (eventName === 'order_created' && status === 'paid') {
      if (isCloudProduct) {
        patch.cloud_sync_active = true;
        patch.cloud_sync_until = null;
        patch.subscription_status = 'active';
        if (portalUrl) patch.customer_portal_url = portalUrl;
      } else {
        patch.pro = true;
        patch.pro_order = attributes.order_number?.toString() || null;
      }
    } else if (eventName === 'license_key_created' && attributes.key) {
      patch.pro = true;
      patch.license_key = attributes.key;
    } else {
      return NextResponse.json({ success: true, ignored: eventName }, { status: 200 });
    }

    const appMetadata = { ...(userData.app_metadata || {}), ...patch };

    // Compatibiliteit met app 1.3.0 (leest user_metadata).
    const legacy: Record<string, unknown> = { ...(userData.user_metadata || {}) };
    if ('cloud_sync_active' in patch) legacy.cloud_sync_active = patch.cloud_sync_active;
    if ('subscription_status' in patch) legacy.subscription_status = patch.subscription_status;
    if ('customer_portal_url' in patch) legacy.customer_portal_url = patch.customer_portal_url;
    if (patch.pro) {
      legacy.is_pro = true;
      legacy.license_key = patch.license_key || legacy.license_key || patch.pro_order || 'PRO_ACTIVATED';
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(targetUserId, {
      app_metadata: appMetadata,
      user_metadata: legacy,
    });

    if (updateError) {
      console.error('Failed to update user metadata:', updateError);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    console.log(`Webhook ${eventName}: updated entitlements for ${targetUserId}`, patch);
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: any) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
