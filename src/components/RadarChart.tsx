"use client";

import type { DimensionScore } from "@/lib/scoring";

interface Props {
  dimensions: DimensionScore[];
  size?: number;
}

const modelLabels: Record<string, string> = {
  C: "Coding习惯度",
  B: "Bug应对",
  T: "团队协作",
  D: "驱动引擎",
  A: "AI人机协作度",
};

const modelColors: Record<string, string> = {
  C: "#92A8D1",
  B: "#B8C9E8",
  T: "#F7CAC9",
  D: "#E88B92",
  A: "#C5D4E8",
};

export default function RadarChart({ dimensions, size = 300 }: Props) {
  const models = ["C", "B", "T", "D", "A"];
  const n = models.length;
  const pad = 70;
  const vw = size + pad * 2;
  const vh = size + pad * 2;
  const cx = vw / 2;
  const cy = vh / 2;
  const maxR = size * 0.36;
  const levels = 3;

  const modelScores = models.map((m) => {
    const modelDims = dimensions.filter((d) => d.model === m);
    if (modelDims.length === 0) return 50;
    return modelDims.reduce((s, d) => s + d.percentage, 0) / modelDims.length;
  });

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * maxR;
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  });

  const dataPoints = modelScores.map((s, i) => getPoint(i, s));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} className="radar-chart">
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#92A8D1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F7CAC9" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="radarStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#92A8D1" />
          <stop offset="50%" stopColor="#C5D4E8" />
          <stop offset="100%" stopColor="#F7CAC9" />
        </linearGradient>
      </defs>

      {gridPaths.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="#DAE2F0" strokeWidth="1.5" opacity={0.6 + i * 0.12} />
      ))}

      {models.map((_, i) => {
        const p = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#DAE2F0" strokeWidth="1.5" opacity={0.35} />;
      })}

      <polygon points={dataPath} fill="url(#radarFill)" stroke="url(#radarStroke)" strokeWidth="3" />

      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="12" fill={modelColors[models[i]]} opacity={0.18} />
          <circle cx={p.x} cy={p.y} r="8" fill={modelColors[models[i]]} stroke="white" strokeWidth="2.5" />
        </g>
      ))}

      {models.map((m, i) => {
        const lp = getPoint(i, 130);
        return (
          <g key={i}>
            <text x={lp.x} y={lp.y - 6} textAnchor="middle" fontSize="20" fontWeight="bold" className="flow-gradient-text-fill" style={{ fill: modelColors[m] }}>
              {modelLabels[m]}
            </text>
            <text x={lp.x} y={lp.y + 16} textAnchor="middle" fontSize="16" fill="#a8a29e">
              {Math.round(modelScores[i])}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}