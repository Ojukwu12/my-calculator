import React from 'react';
import '../styles/Display.css';

interface DisplayProps {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  result: string | null;
  error: string | null;
}

export const Display: React.FC<DisplayProps> = ({
  currentValue,
  previousValue,
  operation,
  result,
  error,
}) => {
  const displayPreviousCalculation = () => {
    if (result && previousValue) {
      return <div className="previous-calculation">{previousValue} = {result}</div>;
    }
    if (operation && previousValue) {
      return (
        <div className="previous-calculation">
          {previousValue} {operation}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="display">
      {displayPreviousCalculation()}
      <div className="current-value" data-testid="current-value">
        {currentValue}
      </div>
      {error && (
        <div className="error-message" data-testid="error-message">
          Error: {error}
        </div>
      )}
    </div>
  );
};
