import React from 'react';

const Display = ({ previous, current }) => {
    return (
        <div style={{
            padding: '20px 30px',
            marginBottom: '10px',
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '180px',
            width: '100%',
        }}>
            <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.5rem',
                marginBottom: '10px',
                minHeight: '2rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>
                {previous}
            </div>
            <div style={{
                color: '#fff',
                fontSize: '4.5rem',
                fontWeight: '300',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: '1.1'
            }}>
                {current || '0'}
            </div>
        </div>
    );
};

export default Display;
