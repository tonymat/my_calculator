import React, { useState, useEffect } from 'react';
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

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            if (/[0-9]/.test(key)) {
                handleButtonClick(key);
            } else if (key === '.') {
                handleButtonClick('.');
            } else if (key === '+' || key === '-') {
                handleButtonClick(key);
            } else if (key === '*') {
                handleButtonClick('×');
            } else if (key === '/') {
                handleButtonClick('÷');
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault(); // Prevent form submission if inside a form
                handleButtonClick('=');
            } else if (key === 'Backspace') {
                handleButtonClick('⌫');
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                handleButtonClick('C');
            } else if (key === '%') {
                handleButtonClick('%');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [current, previous, operation]); // Dependencies needed to access latest state if using closures, but here handleButtonClick uses state setters which is fine, BUT calculate uses state. 
    // Actually, handleButtonClick uses current/previous state values in its logic (e.g. if current === '').
    // So we need to either include dependencies OR use functional state updates.
    // Since handleButtonClick is defined inside the component and closes over state, we need to include it in dependencies or the effect will use stale closures.
    // However, adding it to dependencies means removing/adding listener on every keystroke.
    // Better approach: Use a ref for the event handler or functional updates.
    // For simplicity in this context, adding dependencies is acceptable as performance impact is negligible for a calculator.
    // Wait, handleButtonClick is not wrapped in useCallback, so it changes every render.
    // Let's wrap handleButtonClick in useCallback or just let the effect re-run.
    // Actually, the cleanest way for this simple app is to just let it re-run.

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
            height: '800px',
            maxHeight: '90vh',
            border: '8px solid #333'
        }}>
            <Display previous={previous + (operation ? ` ${operation}` : '')} current={current} />
            <Keypad onButtonClick={handleButtonClick} />
        </div>
    );
};

export default Calculator;
