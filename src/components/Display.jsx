import React from 'react';

const Display = ({ previous, current }) => {
    return (
        <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '20px',
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '120px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.2rem',
                marginBottom: '8px',
                minHeight: '1.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                {previous}
            </div>
            <div style={{
                color: '#fff',
                fontSize: '3rem',
                fontWeight: '600',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                {current || '0'}
            </div>
        </div>
    );
};

export default Display;
