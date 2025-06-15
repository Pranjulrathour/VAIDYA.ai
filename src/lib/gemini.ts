const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export const callGeminiAPI = async (prompt: string): Promise<string> => {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.includes('your-')) {
      throw new Error('Gemini API key not configured. Please update your environment variables');
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response from Gemini API');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Helper function to create health-focused prompts
export const createHealthPrompt = (userMessage: string, context?: string) => {
  const systemPrompt = `You are VAIDYA, an AI health assistant. You provide helpful, accurate health information while always recommending users consult with healthcare professionals for medical advice. You are supportive, understanding, and focus on wellness and preventive care.

${context ? `Previous context: ${context}` : ''}

User message: ${userMessage}

Please provide a helpful, supportive response. Always include appropriate medical disclaimers when giving health advice.`;

  return systemPrompt;
};

// Function to analyze health logs with AI
export const analyzeHealthData = async (healthLogs: string[]): Promise<string> => {
  const prompt = `As a health AI assistant, analyze the following health data and provide insights:

Health logs:
${healthLogs.join('\n')}

Please provide:
1. Summary of key trends
2. Potential areas of concern (if any)
3. Positive health patterns
4. General wellness recommendations

Remember to include appropriate medical disclaimers.`;

  return await callGeminiAPI(prompt);
};
