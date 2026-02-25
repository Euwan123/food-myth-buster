const SUPABASE_URL = 'https://gyrqdwypsqdeeqzmkdze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cnFkd3lwc3FkZWVxem1rZHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjc0MTMsImV4cCI6MjA4Njk0MzQxM30.vR16sz35XJ9wx7HNf-RVeZQ2RoWLeRwgclePx2VT9RA';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase connected!'); 