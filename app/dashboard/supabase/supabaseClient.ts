import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ksaxcwtkkzxnrgalgdhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzYXhjd3Rra3p4bnJnYWxnZGhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgzMzU1NSwiZXhwIjoyMDU0NDA5NTU1fQ.mf8qkhgofOibtQnE3iKvDCar2kpQR67SBLAjK9iMPZg';

export const supabase = createClient(supabaseUrl, supabaseKey);

process.env.SUPABASE_URL = "https://ksaxcwtkkzxnrgalgdhs.supabase.co";
process.env.SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzYXhjd3Rra3p4bnJnYWxnZGhzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODgzMzU1NSwiZXhwIjoyMDU0NDA5NTU1fQ.mf8qkhgofOibtQnE3iKvDCar2kpQR67SBLAjK9iMPZg"; 
