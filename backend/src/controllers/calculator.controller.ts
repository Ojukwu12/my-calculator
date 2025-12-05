import { Request, Response } from 'express';
import { CalculatorService } from '../utils/calculator';
import { CalculateRequest, CalculateResponse } from '../types';
import { AppError, Logger } from '../utils/errorHandler';

export class CalculatorController {
  /**
   * POST /api/calculate
   * Calculates the result of a mathematical expression
   */
  static calculate(req: Request, res: Response): void {
    try {
      const { expression } = req.body as CalculateRequest;

      if (!expression) {
        throw new AppError('Expression is required', 400);
      }

      Logger.info(`Calculating expression: ${expression}`);

      const result = CalculatorService.calculate(expression);

      const response: CalculateResponse = {
        result,
        expression,
      };

      res.status(200).json(response);
    } catch (error) {
      if (error instanceof AppError) {
        const response: CalculateResponse = {
          error: error.message,
        };
        res.status(error.statusCode).json(response);
      } else if (error instanceof Error) {
        Logger.error('Calculation error', error);
        const response: CalculateResponse = {
          error: error.message,
        };
        res.status(400).json(response);
      } else {
        Logger.error('Unknown error', error);
        const response: CalculateResponse = {
          error: 'An unexpected error occurred',
        };
        res.status(500).json(response);
      }
    }
  }

  /**
   * GET /api/health
   * Health check endpoint
   */
  static health(_req: Request, res: Response): void {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'calculator-api',
    });
  }
}
