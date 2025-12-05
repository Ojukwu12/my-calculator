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

// AI integration types
export interface AIExplainRequest {
  expression: string;
  result: number | string;
}

export interface AIExplainResponse {
  explanation?: string;
  learningResources?: string[];
  error?: string;
}

export interface AISuggestResourcesRequest {
  expression: string;
}

export interface AISuggestResourcesResponse {
  resources?: string[];
  error?: string;
}
