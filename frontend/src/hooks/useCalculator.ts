import { useState, useCallback, useEffect } from 'react';
import { CalculatorState } from '../types';
import { calculatorApi } from '../services/api';

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operation: null,
  result: null,
  error: null,
  isNewInput: true,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      // Prevent default for calculator keys
      if (/^[0-9+\-*/.=%^()cC]$/.test(key) || key === 'Enter' || key === 'Escape') {
        event.preventDefault();
      }

      // Numbers
      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
      }
      // Operators
      else if (['+', '-', '*', '/', '%', '^'].includes(key)) {
        handleOperatorInput(key);
      }
      // Decimal point
      else if (key === '.') {
        handleDecimalInput();
      }
      // Equals
      else if (key === 'Enter' || key === '=') {
        handleEquals();
      }
      // Clear
      else if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state]);

  const handleNumberInput = useCallback((num: string) => {
    setState((prev) => {
      if (prev.error) {
        return { ...initialState, currentValue: num, isNewInput: false };
      }

      if (prev.isNewInput) {
        return { ...prev, currentValue: num, isNewInput: false, result: null };
      }

      const newValue = prev.currentValue === '0' ? num : prev.currentValue + num;
      return { ...prev, currentValue: newValue };
    });
  }, []);

  const handleDecimalInput = useCallback(() => {
    setState((prev) => {
      if (prev.error) {
        return { ...initialState, currentValue: '0.', isNewInput: false };
      }

      // Prevent multiple decimals
      if (prev.currentValue.includes('.')) {
        return prev;
      }

      if (prev.isNewInput) {
        return { ...prev, currentValue: '0.', isNewInput: false, result: null };
      }

      return { ...prev, currentValue: prev.currentValue + '.' };
    });
  }, []);

  const handleOperatorInput = useCallback((op: string) => {
    setState((prev) => {
      if (prev.error) {
        return initialState;
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operation: op,
        isNewInput: true,
        result: null,
      };
    });
  }, []);

  const handleEquals = useCallback(async () => {
    setState((prev) => {
      if (!prev.operation || !prev.previousValue) {
        return prev;
      }

      return { ...prev, error: null };
    });

    // Build expression
    const expression = `${state.previousValue}${state.operation}${state.currentValue}`;

    try {
      const response = await calculatorApi.calculate(expression);

      if (response.error) {
        setState((prev) => ({
          ...prev,
          error: response.error || 'Calculation error',
          result: null,
        }));
      } else if (response.result !== undefined) {
        setState((prev) => ({
          ...prev,
          currentValue: String(response.result),
          previousValue: expression,
          operation: null,
          result: String(response.result),
          error: null,
          isNewInput: true,
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Network error',
        result: null,
      }));
    }
  }, [state.previousValue, state.operation, state.currentValue]);

  const handleClear = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
  };
};
