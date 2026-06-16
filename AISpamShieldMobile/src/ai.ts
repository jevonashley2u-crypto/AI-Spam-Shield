import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@env';

// Initialize the OpenAI client.
// WARNING: In a production app, do NOT ship your API key in the client side code.
// This should only be used for local prototyping.
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function analyzeCallOrSms(content: string, type: 'sms' | 'call'): Promise<{
    threatLevel: 'safe' | 'medium' | 'high' | 'critical',
    confidenceScore: number,
    aiAnalysis: string,
    actionTaken: 'allowed' | 'flagged' | 'blocked'
}> {
    const prompt = `
      You are an expert cybersecurity AI for a mobile phone spam shield.
      Analyze the following ${type} content and determine if it is spam, phishing, a scam, or safe.
      
      Content: "${content}"
      
      Respond ONLY in valid JSON format with the following keys:
      - threatLevel: string ("safe", "medium", "high", or "critical")
      - confidenceScore: number (0-100)
      - aiAnalysis: string (1-2 sentences explaining why)
      - actionTaken: string ("allowed" for safe, "flagged" for medium, "blocked" for high/critical)
    `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
        });
        
        const text = response.choices[0].message.content;
        if (!text) throw new Error("No response returned");
        return JSON.parse(text);
    } catch (error) {
        console.error("AI Analysis failed:", error);
        return {
            threatLevel: 'safe',
            confidenceScore: 0,
            aiAnalysis: 'Failed to analyze content due to network error.',
            actionTaken: 'allowed'
        };
    }
}
