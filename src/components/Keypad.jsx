import React from 'react';

const Button = ({ label, onClick, type = 'default', style }) => {
    const getStyle = () => {
        const baseStyle = {
            width: '100%', // Responsive width
            aspectRatio: '1', // Keep circular
            fontSize: '1.75rem',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'filter 0.2s ease',
            fontWeight: '500',
            // Removed margin, relying on grid gap
        };

        if (type === 'operator' || type === 'equals') {
            return {
                ...baseStyle,
                background: 'var(--btn-operator-bg)',
                color: 'var(--btn-text-light)',
            };
        }

        if (type === 'clear' || type === 'backspace' || type === 'function') {
            return {
                ...baseStyle,
                background: 'var(--btn-function-bg)',
                color: 'var(--btn-text-dark)',
            };
        }

        // Default (Numbers)
        return {
            ...baseStyle,
            background: 'var(--btn-number-bg)',
            color: 'var(--btn-text-light)',
        };
    };

    return (
        <button
            onClick={() => onClick(label)}
            style={{ ...getStyle(), ...style }}
            onMouseDown={(e) => e.target.style.filter = 'brightness(1.2)'}
            onMouseUp={(e) => e.target.style.filter = 'none'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
        >
            {label}
        </button>
    );
};

const Keypad = ({ onButtonClick }) => {
    const gridButtons = [
        { label: 'C', type: 'clear' },
        { label: '⌫', type: 'backspace' },
        { label: '%', type: 'function' },
        { label: '÷', type: 'operator' },

        { label: '7' },
        { label: '8' },
        { label: '9' },
        { label: '×', type: 'operator' },

        { label: '4' },
        { label: '5' },
        { label: '6' },
        { label: '-', type: 'operator' },

        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '+', type: 'operator' },

        { label: '0', style: { aspectRatio: 'auto', borderRadius: '40px', gridColumn: 'span 2' } }, // Wide 0 needs auto aspect ratio or specific height
        { label: '.' },
        { label: '=', type: 'equals' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px', // Increased gap slightly for better spacing
            justifyItems: 'center',
            padding: '10px',
            width: '100%',
        }}>
            {gridButtons.map((btn, index) => (
                <Button
                    key={index}
                    label={btn.label}
                    onClick={onButtonClick}
                    type={btn.type}
                    style={btn.style}
                />
            ))}
        </div>
    );
};

export default Keypad;
