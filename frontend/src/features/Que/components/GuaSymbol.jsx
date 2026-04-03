import React from 'react';

const GuaSymbol = ({ symbol, size = 60, color = 'var(--text-primary)', className = '' }) => {
    return (
        <div
            className={`gua-symbol ${className}`}
            style={{
                fontSize: size,
                color: color,
                lineHeight: 1,
                fontFamily: "'Segoe UI Symbol', 'Arial Unicode MS', sans-serif"
            }}
        >
            {symbol}
        </div>
    );
};

export default GuaSymbol;
