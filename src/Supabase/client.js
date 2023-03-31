import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  "https://zjbysrnwgahnvvtpyqud.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqYnlzcm53Z2FobnZ2dHB5cXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY3NDUyNTgsImV4cCI6MTk5MjMyMTI1OH0.8zuFnxp5zaTux-u78VsitoYYgnOT-t4123dlOfF91BY"
);

export default supabase;