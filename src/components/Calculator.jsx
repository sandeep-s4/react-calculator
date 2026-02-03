import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const handlePlusMinus = () => {
    if (display !== '0') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
    }
  };

  const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseStyle = 'h-14 md:h-16 lg:h-20 rounded-2xl font-semibold text-base md:text-lg lg:text-xl transition-all active:scale-95 shadow-lg';
    const variants = {
      default: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      operation: 'bg-blue-500 hover:bg-blue-600 text-white',
      equals: 'bg-green-500 hover:bg-green-600 text-white',
      clear: 'bg-red-500 hover:bg-red-600 text-white'
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <div className="bg-gray-100 rounded-2xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 shadow-inner">
          <div className="text-gray-500 text-xs md:text-sm mb-1 h-5 md:h-6">
            {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-gray-900 text-right text-3xl md:text-4xl lg:text-5xl font-light truncate">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
          <Button variant="clear" onClick={handleClear}>AC</Button>
          <Button onClick={handleDelete}>⌫</Button>
          <Button onClick={handlePlusMinus}>+/−</Button>
          <Button variant="operation" onClick={() => handleOperation('÷')}>÷</Button>
          
          <Button onClick={() => handleNumber(1)}>1</Button>
          <Button onClick={() => handleNumber(2)}>2</Button>
          <Button onClick={() => handleNumber(3)}>3</Button>
          <Button variant="operation" onClick={() => handleOperation('×')}>×</Button>
          
          <Button onClick={() => handleNumber(4)}>4</Button>
          <Button onClick={() => handleNumber(5)}>5</Button>
          <Button onClick={() => handleNumber(6)}>6</Button>
          <Button variant="operation" onClick={() => handleOperation('-')}>−</Button>
          
          <Button onClick={() => handleNumber(7)}>7</Button>
          <Button onClick={() => handleNumber(8)}>8</Button>
          <Button onClick={() => handleNumber(9)}>9</Button>
          <Button variant="operation" onClick={() => handleOperation('+')}>+</Button>
          
          <Button onClick={handlePercentage}>%</Button>
          <Button onClick={() => handleNumber(0)}>0</Button>
          <Button onClick={handleDecimal}>.</Button>
          <Button variant="equals" onClick={handleEquals}>=</Button>
        </div>
      </div>
    </div>
  );
}