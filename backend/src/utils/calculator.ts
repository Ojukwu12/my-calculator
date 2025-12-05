import { evaluate, parse } from 'mathjs';

export class CalculatorService {
  /**
   * Safely evaluates a mathematical expression without using eval()
   * @param expression - The mathematical expression to evaluate
   * @returns The calculated result
   * @throws Error if the expression is invalid or cannot be evaluated
   */
  static calculate(expression: string): number | string {
    if (!expression || typeof expression !== 'string') {
      throw new Error('Invalid expression: Expression must be a non-empty string');
    }

    // Remove whitespace
    const sanitizedExpression = expression.trim();

    if (sanitizedExpression.length === 0) {
      throw new Error('Invalid expression: Expression cannot be empty');
    }

    // Validate that expression only contains allowed characters
    const allowedChars = /^[0-9+\-*/.()%^\s]+$/;
    if (!allowedChars.test(sanitizedExpression)) {
      throw new Error('Invalid expression: Contains forbidden characters');
    }

    try {
      // Parse the expression first to validate syntax
      parse(sanitizedExpression);

      // Evaluate the expression using mathjs
      const result = evaluate(sanitizedExpression);

      // Check for special cases
      if (!isFinite(result)) {
        if (isNaN(result)) {
          throw new Error('Invalid operation: Result is not a number');
        }
        return 'Infinity';
      }

      // Round to avoid floating point precision issues
      return Math.round(result * 1e10) / 1e10;
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific math errors
        if (error.message.includes('division by zero') || 
            error.message.includes('divide by zero')) {
          throw new Error('Cannot divide by zero');
        }
        
        if (error.message.includes('Unexpected')) {
          throw new Error('Invalid expression: Syntax error');
        }

        throw new Error(`Calculation error: ${error.message}`);
      }
      throw new Error('Unknown calculation error');
    }
  }

  /**
   * Validates if a string is a valid mathematical expression
   * @param expression - The expression to validate
   * @returns true if valid, false otherwise
   */
  static isValidExpression(expression: string): boolean {
    try {
      this.calculate(expression);
      return true;
    } catch {
      return false;
    }
  }
}
