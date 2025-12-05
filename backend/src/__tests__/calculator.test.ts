import { CalculatorService } from '../utils/calculator';

describe('CalculatorService', () => {
  describe('calculate', () => {
    // Basic arithmetic operations
    test('should add two numbers correctly', () => {
      expect(CalculatorService.calculate('2 + 3')).toBe(5);
    });

    test('should subtract two numbers correctly', () => {
      expect(CalculatorService.calculate('10 - 4')).toBe(6);
    });

    test('should multiply two numbers correctly', () => {
      expect(CalculatorService.calculate('6 * 7')).toBe(42);
    });

    test('should divide two numbers correctly', () => {
      expect(CalculatorService.calculate('15 / 3')).toBe(5);
    });

    test('should calculate modulo correctly', () => {
      expect(CalculatorService.calculate('10 % 3')).toBe(1);
    });

    test('should calculate power correctly', () => {
      expect(CalculatorService.calculate('2 ^ 3')).toBe(8);
    });

    // Decimal operations
    test('should handle decimal numbers', () => {
      expect(CalculatorService.calculate('1.5 + 2.5')).toBe(4);
    });

    test('should handle floating point precision', () => {
      const result = CalculatorService.calculate('0.1 + 0.2');
      expect(result).toBeCloseTo(0.3, 10);
    });

    // Complex expressions
    test('should handle complex expressions with parentheses', () => {
      expect(CalculatorService.calculate('(2 + 3) * 4')).toBe(20);
    });

    test('should respect order of operations', () => {
      expect(CalculatorService.calculate('2 + 3 * 4')).toBe(14);
    });

    test('should handle nested parentheses', () => {
      expect(CalculatorService.calculate('((2 + 3) * (4 + 5))')).toBe(45);
    });

    test('should handle multiple operations', () => {
      expect(CalculatorService.calculate('2 + 3 * 4 - 5 / 5')).toBe(13);
    });

    test('should handle negative numbers', () => {
      expect(CalculatorService.calculate('-5 + 3')).toBe(-2);
    });

    test('should handle negative results', () => {
      expect(CalculatorService.calculate('3 - 10')).toBe(-7);
    });

    // Edge cases
    test('should throw error for division by zero', () => {
      expect(() => CalculatorService.calculate('10 / 0')).toThrow('Cannot divide by zero');
    });

    test('should throw error for empty expression', () => {
      expect(() => CalculatorService.calculate('')).toThrow('Expression cannot be empty');
    });

    test('should throw error for whitespace-only expression', () => {
      expect(() => CalculatorService.calculate('   ')).toThrow('Expression cannot be empty');
    });

    test('should throw error for invalid expression', () => {
      expect(() => CalculatorService.calculate('2 +')).toThrow();
    });

    test('should throw error for non-string input', () => {
      expect(() => CalculatorService.calculate(null as any)).toThrow('Invalid expression');
    });

    test('should throw error for undefined input', () => {
      expect(() => CalculatorService.calculate(undefined as any)).toThrow('Invalid expression');
    });

    test('should throw error for expressions with forbidden characters', () => {
      expect(() => CalculatorService.calculate('alert("xss")')).toThrow('forbidden characters');
    });

    test('should throw error for expressions with letters', () => {
      expect(() => CalculatorService.calculate('2 + abc')).toThrow('forbidden characters');
    });

    test('should handle zero correctly', () => {
      expect(CalculatorService.calculate('0 + 0')).toBe(0);
    });

    test('should handle multiplication by zero', () => {
      expect(CalculatorService.calculate('5 * 0')).toBe(0);
    });

    test('should handle very large numbers', () => {
      const result = CalculatorService.calculate('999999999 + 1');
      expect(result).toBe(1000000000);
    });

    test('should handle very small numbers', () => {
      const result = CalculatorService.calculate('0.0001 + 0.0002');
      expect(result).toBeCloseTo(0.0003, 10);
    });

    // Syntax errors
    test('should throw error for mismatched parentheses', () => {
      expect(() => CalculatorService.calculate('(2 + 3')).toThrow();
    });

    test('should throw error for multiple operators', () => {
      expect(() => CalculatorService.calculate('2 ++ 3')).toThrow();
    });

    test('should throw error for trailing operator', () => {
      expect(() => CalculatorService.calculate('2 + 3 *')).toThrow();
    });

    test('should handle expressions with spaces', () => {
      expect(CalculatorService.calculate('  2   +   3  ')).toBe(5);
    });
  });

  describe('isValidExpression', () => {
    test('should return true for valid expressions', () => {
      expect(CalculatorService.isValidExpression('2 + 3')).toBe(true);
    });

    test('should return false for invalid expressions', () => {
      expect(CalculatorService.isValidExpression('2 +')).toBe(false);
    });

    test('should return false for empty expressions', () => {
      expect(CalculatorService.isValidExpression('')).toBe(false);
    });

    test('should return false for division by zero', () => {
      expect(CalculatorService.isValidExpression('5 / 0')).toBe(false);
    });
  });
});
