const SUPABASE_URL = 'https://gyrqdwypsqdeeqzmkdze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cnFkd3lwc3FkZWVxem1rZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzE0MjUsImV4cCI6MjA1MzI0NzQyNX0.sb_publishable_MHxdOq1kMx6GI_Ctbf9eeQ_TtTQ7mhtqLMqPiFg';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connected!');