const SUPABASE_URL = 'https://gyrqdwypsqdeeqzmkdze.supabase.co';
const SUPABASE_ANON_KEY = 'PASTE_YOUR_FULL_ANON_KEY_HERE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connected:', supabase);