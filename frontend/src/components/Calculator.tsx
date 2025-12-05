import React from 'react';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { useCalculator } from '../hooks/useCalculator';
import '../styles/Calculator.css';

export const Calculator: React.FC = () => {
  const {
    state,
    handleNumberInput,
    handleDecimalInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
  } = useCalculator();

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display
          currentValue={state.currentValue}
          previousValue={state.previousValue}
          operation={state.operation}
          result={state.result}
          error={state.error}
        />
        <ButtonGrid
          onNumberClick={handleNumberInput}
          onOperatorClick={handleOperatorInput}
          onEqualsClick={handleEquals}
          onClearClick={handleClear}
          onDecimalClick={handleDecimalInput}
        />
      </div>
      <div className="instructions">
        <p>💡 Tip: You can use your keyboard!</p>
        <p>Numbers (0-9), Operators (+, -, *, /, %, ^), Enter (=), Escape (C)</p>
      </div>
    </div>
  );
};
