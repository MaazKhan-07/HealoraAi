import { useEffect, useState } from "react";

interface RiskGaugeProps {
  score: number;
  size?: number;
  showLabel?: boolean;
}

export function RiskGauge({ score, size = 140, showLabel = true }: RiskGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const duration = 1500;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (animatedScore / 100) * circumference * 0.75;
  const startAngle = 135;
  const endAngle = startAngle + (animatedScore / 100) * 270;

  const getColor = (s: number) => {
    if (s < 40) return '#00e676';
    if (s < 70) return '#ffb300';
    return '#ff6b6b';
  };

  const getRiskLabel = (s: number) => {
    if (s < 40) return { label: 'Low Risk', color: '#00e676' };
    if (s < 70) return { label: 'Moderate Risk', color: '#ffb300' };
    return { label: 'High Risk', color: '#ff6b6b' };
  };

  const color = getColor(animatedScore);
  const { label, color: labelColor } = getRiskLabel(score);

  const cx = size / 2;
  const cy = size / 2;

  // Arc path
  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const describeArc = (startDeg: number, endDeg: number) => {
    const start = polarToCartesian(startDeg);
    const end = polarToCartesian(endDeg);
    const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <path
          d={describeArc(135, 405)}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Filled arc */}
        {animatedScore > 0 && (
          <path
            d={describeArc(135, Math.max(135.1, startAngle + (animatedScore / 100) * 270))}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        )}
        {/* Score text */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="700"
          fill={color}
          fontFamily="Sora, sans-serif"
        >
          {animatedScore}
        </text>
        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fill="rgba(255,255,255,0.4)"
          fontFamily="DM Sans, sans-serif"
        >
          / 100
        </text>
      </svg>
      {showLabel && (
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            color: labelColor,
            background: `${labelColor}18`,
            border: `1px solid ${labelColor}40`,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
