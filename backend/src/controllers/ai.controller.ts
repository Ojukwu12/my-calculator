import { Request, Response } from 'express';
import { AIService } from '../utils/ai.service';
import { AIExplainRequest, AIExplainResponse, AISuggestResourcesRequest, AISuggestResourcesResponse } from '../types';
import { AppError, Logger } from '../utils/errorHandler';

export class AIController {
  /**
   * POST /api/ai/explain
   * Get AI explanation for a calculation
   */
  static async explain(req: Request, res: Response): Promise<void> {
    try {
      if (!AIService.isConfigured()) {
        throw new AppError('AI service is not configured. Please add GEMINI_API_KEY to environment variables.', 503);
      }

      const { expression, result } = req.body as AIExplainRequest;

      if (!expression || result === undefined) {
        throw new AppError('Expression and result are required', 400);
      }

      Logger.info(`AI explain request: ${expression} = ${result}`);

      const explanation = await AIService.explainCalculation(expression, result);
      const resources = await AIService.suggestResources(expression);

      const response: AIExplainResponse = {
        explanation,
        learningResources: resources,
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: AIExplainResponse = {
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else if (error instanceof Error) {
        Logger.error('AI explanation error', error);
        const response: AIExplainResponse = {
          error: error.message,
        };
        res.status(500).json(response);
      } else {
        Logger.error('Unknown AI error', error);
        const response: AIExplainResponse = {
          error: 'An unexpected error occurred',
        };
        res.status(500).json(response);
      }
    }
  }

  /**
   * POST /api/ai/suggest-resources
   * Get learning resource suggestions
   */
  static async suggestResources(req: Request, res: Response): Promise<void> {
    try {
      if (!AIService.isConfigured()) {
        throw new AppError('AI service is not configured. Please add GEMINI_API_KEY to environment variables.', 503);
      }

      const { expression } = req.body as AISuggestResourcesRequest;

      if (!expression) {
        throw new AppError('Expression is required', 400);
      }

      Logger.info(`AI resources request: ${expression}`);

      const resources = await AIService.suggestResources(expression);

      const response: AISuggestResourcesResponse = {
        resources,
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: AISuggestResourcesResponse = {
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else if (error instanceof Error) {
        Logger.error('AI resources error', error);
        const response: AISuggestResourcesResponse = {
          error: error.message,
        };
        res.status(500).json(response);
      } else {
        Logger.error('Unknown AI error', error);
        const response: AISuggestResourcesResponse = {
          error: 'An unexpected error occurred',
        };
        res.status(500).json(response);
      }
    }
  }
}
