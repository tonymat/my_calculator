import React from 'react';

const Button = ({ label, onClick, type = 'default', style }) => {
    const getStyle = () => {
        const baseStyle = {
            padding: '20px',
            fontSize: '1.25rem',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(5px)',
        };

        if (type === 'operator') {
            return {
                ...baseStyle,
                background: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                color: '#a5b4fc',
            };
        }

        if (type === 'equals') {
            return {
                ...baseStyle,
                background: 'var(--primary-gradient)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                fontWeight: '600',
            };
        }

        if (type === 'clear') {
            return {
                ...baseStyle,
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
            };
        }

        return baseStyle;
    };

    return (
        <button
            onClick={() => onClick(label)}
            style={{ ...getStyle(), ...style }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.background = type === 'equals'
                    ? 'var(--primary-gradient)'
                    : type === 'operator'
                        ? 'rgba(99, 102, 241, 0.3)'
                        : 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'none';
                e.target.style.background = getStyle().background;
            }}
            onMouseDown={(e) => e.target.style.transform = 'translateY(1px)'}
            onMouseUp={(e) => e.target.style.transform = 'translateY(-2px)'}
        >
            {label}
        </button>
    );
};

const Keypad = ({ onButtonClick }) => {
    const buttons = [
        { label: 'C', type: 'clear' },
        { label: '÷', type: 'operator' },
        { label: '×', type: 'operator' },
        { label: '⌫', type: 'operator' },
        { label: '7' },
        { label: '8' },
        { label: '9' },
        { label: '-', type: 'operator' },
        { label: '4' },
        { label: '5' },
        { label: '6' },
        { label: '+', type: 'operator' },
        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '=', type: 'equals', style: { gridRow: 'span 2' } },
        { label: '0', style: { gridColumn: 'span 2' } },
        { label: '.' },
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
        }}>
            {buttons.map((btn, index) => (
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
