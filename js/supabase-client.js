const SUPABASE_URL = 'https://gyrqdwypsqdeeqzmkdze.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MHxJDqikMx6GI_Ctbf9eeQ_Tt7Q7Uk5';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connected:', supabase);