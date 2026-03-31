import { useState, useRef, useEffect } from "react";

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
  title?: string;
}

export function BarChart({ data, maxValue = 10, height = 160, title }: BarChartProps) {
  const [animated, setAnimated] = useState(false);
  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {title && <p className="text-sm font-medium text-muted-foreground mb-3">{title}</p>}
      <div className="relative flex items-end gap-2 justify-between" style={{ height }}>
        {data.map((item, idx) => {
          const pct = (item.value / maxValue) * 100;
          const color = item.color || '#00d4c8';
          return (
            <div key={idx} className="flex flex-col items-center gap-1 flex-1">
              <div className="relative w-full flex justify-center">
                {tooltip?.idx === idx && (
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 text-xs font-semibold z-10 whitespace-nowrap"
                    style={{ color }}
                  >
                    {item.value}
                  </div>
                )}
                <div
                  className="w-full rounded-t-lg cursor-pointer transition-all hover:opacity-90 hover:scale-105"
                  style={{
                    height: animated ? `${(pct / 100) * (height - 24)}px` : '0px',
                    background: `linear-gradient(to top, ${color}cc, ${color}66)`,
                    boxShadow: `0 0 8px ${color}40`,
                    transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: animated && item.value > 0 ? '4px' : '0px',
                  }}
                  onMouseEnter={() => setTooltip({ idx, x: 0, y: 0 })}
                  onMouseLeave={() => setTooltip(null)}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
