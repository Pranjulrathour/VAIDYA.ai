// Environment configuration for API credentials
// Replace these with your actual credentials

export const ENV_CONFIG = {
  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co",
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || "your-supabase-anon-key-here",
  
  // Gemini AI Configuration
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || "your-gemini-api-key-here",
  GEMINI_API_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
  
  // Other API configurations can be added here
  // OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || "your-openai-key-here",
};

// Validation function to check if required environment variables are set
export const validateEnvConfig = () => {
  const requiredVars = [
    { key: 'SUPABASE_URL', value: ENV_CONFIG.SUPABASE_URL },
    { key: 'SUPABASE_ANON_KEY', value: ENV_CONFIG.SUPABASE_ANON_KEY },
    { key: 'GEMINI_API_KEY', value: ENV_CONFIG.GEMINI_API_KEY },
  ];

  const missingVars = requiredVars.filter(
    ({ value }) => !value || value.includes('your-') || value.includes('replace-')
  );

  if (missingVars.length > 0) {
    console.warn('⚠️ Missing or placeholder environment variables:', 
      missingVars.map(v => v.key).join(', ')
    );
    console.warn('Please update src/config/env.ts with your actual API credentials');
    return false;
  }

  return true;
};

// Initialize validation on import
validateEnvConfig();
