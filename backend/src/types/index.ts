export interface CalculateRequest {
  expression: string;
}

export interface CalculateResponse {
  result?: number | string;
  error?: string;
  expression?: string;
}

export interface ErrorResponse {
  error: string;
  statusCode: number;
}

// Future AI integration types (not implemented yet, but ready for extension)
export interface AIExplainRequest {
  expression: string;
  result: number | string;
}

export interface AIExplainResponse {
  explanation?: string;
  learningResources?: string[];
  error?: string;
}
