import React from 'react';
import { Button } from './Button';
import '../styles/ButtonGrid.css';

interface ButtonGridProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: string) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onDecimalClick: () => void;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({
  onNumberClick,
  onOperatorClick,
  onEqualsClick,
  onClearClick,
  onDecimalClick,
}) => {
  return (
    <div className="button-grid">
      <Button label="C" onClick={onClearClick} className="clear" ariaLabel="Clear" />
      <Button label="%" onClick={() => onOperatorClick('%')} className="operator" ariaLabel="Modulo" />
      <Button label="^" onClick={() => onOperatorClick('^')} className="operator" ariaLabel="Power" />
      <Button label="/" onClick={() => onOperatorClick('/')} className="operator" ariaLabel="Divide" />

      <Button label="7" onClick={() => onNumberClick('7')} className="number" />
      <Button label="8" onClick={() => onNumberClick('8')} className="number" />
      <Button label="9" onClick={() => onNumberClick('9')} className="number" />
      <Button label="*" onClick={() => onOperatorClick('*')} className="operator" ariaLabel="Multiply" />

      <Button label="4" onClick={() => onNumberClick('4')} className="number" />
      <Button label="5" onClick={() => onNumberClick('5')} className="number" />
      <Button label="6" onClick={() => onNumberClick('6')} className="number" />
      <Button label="-" onClick={() => onOperatorClick('-')} className="operator" ariaLabel="Subtract" />

      <Button label="1" onClick={() => onNumberClick('1')} className="number" />
      <Button label="2" onClick={() => onNumberClick('2')} className="number" />
      <Button label="3" onClick={() => onNumberClick('3')} className="number" />
      <Button label="+" onClick={() => onOperatorClick('+')} className="operator" ariaLabel="Add" />

      <Button label="0" onClick={() => onNumberClick('0')} className="number zero" />
      <Button label="." onClick={onDecimalClick} className="number" ariaLabel="Decimal point" />
      <Button label="=" onClick={onEqualsClick} className="equals" ariaLabel="Equals" />
    </div>
  );
};
