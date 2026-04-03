import React from 'react';

/**
 * Biểu đồ Radar Ngũ Hành - Simple static version
 * Vietnamese labels only: MỘC, HỎA, THỔ, KIM, THỦY
 * Now uses RAW SCORES instead of percentages
 */
const RelationshipRadar = ({ scores }) => {
    // Get raw scores from Vietnamese keys (Kim, Mộc, Thủy, Hỏa, Thổ)
    const rawScores = {
        moc: scores?.Mộc || scores?.Wood || scores?.wood || 0,
        hoa: scores?.Hỏa || scores?.Fire || scores?.fire || 0,
        tho: scores?.Thổ || scores?.Earth || scores?.earth || 0,
        kim: scores?.Kim || scores?.Metal || scores?.metal || 0,
        thuy: scores?.Thủy || scores?.Water || scores?.water || 0,
    };

    // Find max value to scale the radar
    const maxVal = Math.max(...Object.values(rawScores), 1);

    const elements = [
        { name: 'MỘC', angle: -90, val: rawScores.moc, color: '#2ecc71' },
        { name: 'HỎA', angle: -18, val: rawScores.hoa, color: '#e74c3c' },
        { name: 'THỔ', angle: 54, val: rawScores.tho, color: '#f39c12' },
        { name: 'KIM', angle: 126, val: rawScores.kim, color: '#95a5a6' },
        { name: 'THỦY', angle: 198, val: rawScores.thuy, color: '#3498db' },
    ];

    const size = 240;
    const center = size / 2;
    const radius = (size / 2) - 35;

    // Scale value to percentage of max for radar display
    const getPoint = (angle, val) => {
        const rad = (angle * Math.PI) / 180;
        const r = (val / maxVal) * radius;  // Scale by maxVal instead of 100
        return {
            x: center + r * Math.cos(rad),
            y: center + r * Math.sin(rad)
        };
    };

    // Create polygon points for the data area
    const polyPoints = elements.map(p => {
        const pt = getPoint(p.angle, p.val);
        return `${pt.x},${pt.y}`;
    }).join(' ');

    return (
        <div className="radar-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background grid circles */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                    <polygon
                        key={i}
                        points={elements.map(p => {
                            const pt = getPoint(p.angle, 100 * scale);
                            return `${pt.x},${pt.y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                    />
                ))}

                {/* Axis lines from center to each point */}
                {elements.map((p, i) => {
                    const pt = getPoint(p.angle, 100);
                    return (
                        <line
                            key={i}
                            x1={center} y1={center} x2={pt.x} y2={pt.y}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data polygon */}
                <polygon
                    points={polyPoints}
                    fill="rgba(226, 192, 68, 0.2)"
                    stroke="#e2c044"
                    strokeWidth="2"
                />

                {/* Data points */}
                {elements.map((p, i) => {
                    const pt = getPoint(p.angle, p.val);
                    return (
                        <circle
                            key={i}
                            cx={pt.x} cy={pt.y} r="5"
                            fill={p.color}
                            stroke="white"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Labels with icons */}
                {elements.map((p, i) => {
                    const labelRadius = radius + 18;
                    const rad = (p.angle * Math.PI) / 180;
                    const lx = center + labelRadius * Math.cos(rad);
                    const ly = center + labelRadius * Math.sin(rad);
                    const icons = { 'MỘC': '❧', 'HỎA': '◈', 'THỔ': '◆', 'KIM': '◇', 'THỦY': '◎' };
                    return (
                        <g key={i}>
                            <text
                                x={lx}
                                y={ly - 3}
                                fill={p.color}
                                fontSize="10"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {icons[p.name]} {p.name}
                            </text>
                            <text
                                x={lx}
                                y={ly + 8}
                                fill="rgba(255,255,255,0.8)"
                                fontSize="9"
                                fontWeight="600"
                                textAnchor="middle"
                            >
                                {p.val}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default RelationshipRadar;
