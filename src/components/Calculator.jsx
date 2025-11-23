import React, { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

const Calculator = () => {
    const [current, setCurrent] = useState('');
    const [previous, setPrevious] = useState('');
    const [operation, setOperation] = useState(null);

    const handleButtonClick = (value) => {
        if (value === 'C') {
            setCurrent('');
            setPrevious('');
            setOperation(null);
            return;
        }

        if (value === '⌫') {
            setCurrent(current.slice(0, -1));
            return;
        }

        if (value === '%') {
            // Simple percent logic: divide by 100
            if (current) {
                setCurrent((parseFloat(current) / 100).toString());
            }
            return;
        }

        if (['+', '-', '×', '÷'].includes(value)) {
            if (current === '') return;
            if (previous !== '') {
                calculate();
            } else {
                setPrevious(current);
            }
            setCurrent('');
            setOperation(value);
            return;
        }

        if (value === '=') {
            if (current === '' || previous === '') return;
            calculate();
            return;
        }

        if (value === '.') {
            if (current.includes('.')) return;
        }

        setCurrent(current + value);
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previous);
        const curr = parseFloat(current);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (operation) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '×':
                result = prev * curr;
                break;
            case '÷':
                result = prev / curr;
                break;
            default:
                return;
        }

        setCurrent(result.toString());
        setOperation(null);
        setPrevious('');
    };

    return (
        <div style={{
            background: '#000',
            borderRadius: '40px',
            padding: '20px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '800px', // Fixed height to simulate phone screen
            maxHeight: '90vh',
            border: '8px solid #333' // Bezel
        }}>
            <Display previous={previous + (operation ? ` ${operation}` : '')} current={current} />
            <Keypad onButtonClick={handleButtonClick} />
        </div>
    );
};

export default Calculator;
