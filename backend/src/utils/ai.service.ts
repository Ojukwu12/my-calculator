import { GoogleGenerativeAI } from '@google/generative-ai';
import { Logger } from './errorHandler';

export class AIService {
  private static genAI: GoogleGenerativeAI | null = null;

  /**
   * Initialize the Gemini AI service
   */
  private static initialize(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in environment variables');
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      Logger.info('Gemini AI service initialized');
    }

    return this.genAI;
  }

  /**
   * Get explanation for a calculation
   */
  static async explainCalculation(expression: string, result: number | string): Promise<string> {
    try {
      const genAI = this.initialize();
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `You are a helpful math tutor. Explain this calculation in a clear, educational way:

Expression: ${expression}
Result: ${result}

Provide a brief explanation (2-3 sentences) that:
1. Breaks down the steps if it's a complex expression
2. Mentions any mathematical rules used (like order of operations)
3. Is easy to understand for students

Keep it concise and friendly.`;

      const response = await model.generateContent(prompt);
      const explanation = response.response.text();

      Logger.info(`AI explanation generated for: ${expression}`);
      return explanation;
    } catch (error) {
      Logger.error('Error generating AI explanation', error);
      throw new Error('Failed to generate explanation. Please check your API configuration.');
    }
  }

  /**
   * Get learning resources suggestions
   */
  static async suggestResources(expression: string): Promise<string[]> {
    try {
      const genAI = this.initialize();
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `Based on this mathematical expression: ${expression}

Suggest 3-4 relevant learning topics or concepts that would help someone understand this better.
Format as a simple bullet list with just the topic names, no URLs or extra text.

Example format:
- Order of Operations (PEMDAS)
- Basic Arithmetic
- Exponents and Powers`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();

      // Parse the bullet points
      const resources = text
        .split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(line => line.replace(/^[-•]\s*/, '').trim())
        .filter(line => line.length > 0)
        .slice(0, 4); // Limit to 4 items

      Logger.info(`AI resources suggested for: ${expression}`);
      return resources.length > 0 ? resources : ['Basic Arithmetic', 'Mathematical Operations'];
    } catch (error) {
      Logger.error('Error generating resource suggestions', error);
      throw new Error('Failed to suggest resources. Please check your API configuration.');
    }
  }

  /**
   * Check if AI service is configured
   */
  static isConfigured(): boolean {
    return !!process.env.GEMINI_API_KEY;
  }
}
