import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

/** OpenAI config */
if (!import.meta.env.VITE_OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
console.log('✅ OpenAI API Key loaded:', import.meta.env.VITE_OPENAI_API_KEY ? 'Present' : 'Missing');
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
console.log('✅ OpenAI client created successfully');

/** Supabase config */
const privateKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_ANON_KEY`);
console.log('✅ Supabase Anon Key loaded:', privateKey ? 'Present' : 'Missing');
const url = import.meta.env.VITE_SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
console.log('✅ Supabase URL loaded:', url);
export const supabase = createClient(url, privateKey);
console.log('✅ Supabase client created successfully');