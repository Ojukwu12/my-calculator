import React from 'react';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { AIPanel } from './AIPanel';
import { useCalculator } from '../hooks/useCalculator';
import { useAI } from '../hooks/useAI';
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

  const { aiState, getExplanation, getSuggestions, clearAI } = useAI();

  const handleAskExplanation = () => {
    if (state.result) {
      getExplanation(`${state.previousValue}${state.operation}${state.currentValue}`, state.result);
    }
  };

  const handleAskResources = () => {
    if (state.previousValue) {
      getSuggestions(`${state.previousValue}${state.operation}${state.currentValue}`);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display
          currentValue={state.currentValue}
          previousValue={state.previousValue}
          operation={state.operation}
          result={state.result}
          error={state.error}
          onAskExplanation={state.result ? handleAskExplanation : undefined}
          onAskResources={state.result ? handleAskResources : undefined}
        />
        <ButtonGrid
          onNumberClick={handleNumberInput}
          onOperatorClick={handleOperatorInput}
          onEqualsClick={handleEquals}
          onClearClick={handleClear}
          onDecimalClick={handleDecimalInput}
        />
      </div>
      <AIPanel
        explanation={aiState.explanation}
        resources={aiState.resources}
        concept={aiState.concept}
        loading={aiState.loading}
        error={aiState.error}
        onClear={clearAI}
      />
      <div className="instructions">
        <p>💡 Tip: You can use your keyboard!</p>
        <p>Numbers (0-9), Operators (+, -, *, /, %, ^), Enter (=), Escape (C)</p>
        <p>🤖 Click "Explain" or "Learn" to get AI-powered insights!</p>
      </div>
    </div>
  );
};
