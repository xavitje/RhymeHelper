import { createClient } from '@supabase/supabase-js';
import { sharedAuthStorage, sharedCookiesEnabled } from './sharedSessionCookie';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Op rhymehelper.store: dezelfde login als in de webapp (app.rhymehelper.store), via een gedeelde cookie.
// Op de server en op previews/localhost: de gewone opslag.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, sharedCookiesEnabled() ? { auth: { storage: sharedAuthStorage } } : undefined);
