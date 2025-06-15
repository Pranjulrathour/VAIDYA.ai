import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface HealthReportAnalysis {
  overallHealth: string;
  keyFindings: string[];
  recommendations: string[];
  riskFactors: string[];
  healthScore: number;
  summary: string;
}

export const analyzeHealthReport = async (reportText: string): Promise<HealthReportAnalysis> => {
  const prompt = `
    Analyze the following health report and provide a comprehensive analysis in JSON format:
    
    ${reportText}
    
    Please provide the analysis in the following JSON structure:
    {
      "overallHealth": "Brief overall health assessment",
      "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
      "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
      "riskFactors": ["Risk factor 1", "Risk factor 2"],
      "healthScore": 85,
      "summary": "Detailed summary of the health report"
    }
    
    Make sure the healthScore is between 0-100 based on the report findings.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error analyzing health report:', error);
    throw error;
  }
};

export const generateHealthInsights = async (userHealthData: any): Promise<string[]> => {
  const prompt = `
    Based on the following health data, generate 5 personalized health insights and recommendations:
    
    ${JSON.stringify(userHealthData)}
    
    Provide practical, actionable insights in an array format.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response to extract insights
    const insights = text.split('\n').filter(line => line.trim().length > 0);
    return insights.slice(0, 5);
  } catch (error) {
    console.error('Error generating health insights:', error);
    throw error;
  }
};

export const chatWithHealthAssistant = async (message: string, context?: string): Promise<string> => {
  const prompt = `
    You are VAIDYA.ai, a helpful AI health assistant. Respond to the user's health-related question.
    ${context ? `Context: ${context}` : ''}
    
    User question: ${message}
    
    Provide a helpful, accurate, and empathetic response. Always remind users to consult healthcare professionals for serious concerns.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in health assistant chat:', error);
    throw error;
  }
}; 