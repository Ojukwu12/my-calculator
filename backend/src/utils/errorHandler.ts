/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Logger utility for consistent error logging
 */
export class Logger {
  static error(message: string, error?: Error | unknown): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
    
    if (error instanceof Error) {
      console.error(`Stack trace: ${error.stack}`);
    } else if (error) {
      console.error('Error details:', error);
    }
  }

  static info(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`);
  }

  static warn(message: string): void {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`);
  }
}
