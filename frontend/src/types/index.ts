export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  result: string | null;
  error: string | null;
  isNewInput: boolean;
}

export interface CalculateResponse {
  result?: number | string;
  error?: string;
  expression?: string;
}

export type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'decimal';

export interface CalculatorButton {
  label: string;
  value: string;
  type: ButtonType;
  className?: string;
}

// Future AI integration types (ready for extension)
export interface AIExplanation {
  explanation: string;
  learningResources?: string[];
}
