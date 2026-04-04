"use client";

// ─── Primitive building blocks ──────────────────────────────────────────────

export type RoseColors = {
  petal: string;
  mid: string;
  inner: string;
  center: string;
};

export type FloralPalette = {
  rose1: RoseColors;
  rose2: RoseColors;
  leaf: string;
  leafDark: string;
  dot: string;
};

function Rose({
  x = 0,
  y = 0,
  r = 22,
  colors,
  opacity = 1,
}: {
  x?: number;
  y?: number;
  r: number;
  colors: RoseColors;
  opacity?: number;
}) {
  const { petal, mid, inner, center } = colors;
  const O = [0, 72, 144, 216, 288];
  const M = [36, 108, 180, 252, 324];
  const I = [0, 120, 240];
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      <circle cx={0} cy={0} r={r * 1.08} fill={petal} fillOpacity={0.1} />
      {O.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-r * 0.58}
          rx={r * 0.42}
          ry={r * 0.55}
          fill={petal}
          fillOpacity={0.82}
          transform={`rotate(${a})`}
        />
      ))}
      {M.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-r * 0.36}
          rx={r * 0.33}
          ry={r * 0.43}
          fill={mid}
          fillOpacity={0.88}
          transform={`rotate(${a})`}
        />
      ))}
      {I.map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-r * 0.21}
          rx={r * 0.24}
          ry={r * 0.3}
          fill={inner}
          fillOpacity={0.92}
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.19} fill={center} fillOpacity={0.97} />
    </g>
  );
}

function Blossom({
  x = 0,
  y = 0,
  r = 8,
  color,
  center,
  opacity = 1,
}: {
  x?: number;
  y?: number;
  r: number;
  color: string;
  center: string;
  opacity?: number;
}) {
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-r * 0.54}
          rx={r * 0.44}
          ry={r * 0.52}
          fill={color}
          fillOpacity={0.78}
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.3} fill={center} fillOpacity={0.9} />
    </g>
  );
}

function Leaf({
  x = 0,
  y = 0,
  h = 30,
  w = 12,
  rotation = 0,
  color = "#5a8850",
  opacity = 1,
}: {
  x?: number;
  y?: number;
  h?: number;
  w?: number;
  rotation?: number;
  color?: string;
  opacity?: number;
}) {
  const d = `M 0 0 C ${-w / 2} ${-h * 0.32} ${-w * 0.3} ${-h * 0.72} 0 ${-h} C ${w * 0.3} ${-h * 0.72} ${w / 2} ${-h * 0.32} 0 0`;
  const v = `M 0 -1 L ${w * 0.1} ${-h * 0.82}`;
  return (
    <g transform={`translate(${x},${y}) rotate(${rotation})`} opacity={opacity}>
      <path d={d} fill={color} fillOpacity={0.85} />
      <path d={v} stroke={color} strokeWidth={0.9} strokeOpacity={0.45} fill="none" />
    </g>
  );
}

// ─── Pre-built palettes ──────────────────────────────────────────────────────

export const PALETTES: Record<string, FloralPalette> = {
  burgundy: {
    rose1: { petal: "#c8405a", mid: "#a82040", inner: "#881530", center: "#481018" },
    rose2: { petal: "#f5d0d8", mid: "#e8a8b8", inner: "#d87888", center: "#b84858" },
    leaf: "#5a8840",
    leafDark: "#3a6028",
    dot: "#c89018",
  },
  blushPink: {
    rose1: { petal: "#f0a8b8", mid: "#e07888", inner: "#c85870", center: "#a03050" },
    rose2: { petal: "#fce8ec", mid: "#f0c8d0", inner: "#e0a0b0", center: "#c07080" },
    leaf: "#508050",
    leafDark: "#386038",
    dot: "#d0506a",
  },
  deepPink: {
    rose1: { petal: "#e03878", mid: "#c01858", inner: "#a00840", center: "#580020" },
    rose2: { petal: "#f9a8cc", mid: "#f080a8", inner: "#e05880", center: "#c03058" },
    leaf: "#4a7840",
    leafDark: "#326030",
    dot: "#e0507a",
  },
  creamGold: {
    rose1: { petal: "#f8ecd8", mid: "#f0d0b0", inner: "#e0b080", center: "#c07820" },
    rose2: { petal: "#fdf8ee", mid: "#f8e8cc", inner: "#f0d0a0", center: "#d09040" },
    leaf: "#5a7a40",
    leafDark: "#3a5828",
    dot: "#d4af37",
  },
  terracotta: {
    rose1: { petal: "#d46040", mid: "#b84020", inner: "#982810", center: "#581008" },
    rose2: { petal: "#f8c8a8", mid: "#f0a888", inner: "#e07858", center: "#c05030" },
    leaf: "#608040",
    leafDark: "#486030",
    dot: "#a06820",
  },
  lavender: {
    rose1: { petal: "#b080d0", mid: "#9060b8", inner: "#7040a0", center: "#401860" },
    rose2: { petal: "#e8c8f8", mid: "#d8a8f0", inner: "#c888e0", center: "#a060c0" },
    leaf: "#5a7048",
    leafDark: "#3a5030",
    dot: "#c0a0d8",
  },
  coral: {
    rose1: { petal: "#f08060", mid: "#d86040", inner: "#c04028", center: "#801810" },
    rose2: { petal: "#fce0d0", mid: "#f8c0a8", inner: "#f09880", center: "#d86050" },
    leaf: "#508858",
    leafDark: "#386840",
    dot: "#e08040",
  },
  botanical: {
    rose1: { petal: "#e8f0e0", mid: "#c8d8b8", inner: "#a0b888", center: "#608040" },
    rose2: { petal: "#f8fcf4", mid: "#e0ecd0", inner: "#c0d0a8", center: "#7a9058" },
    leaf: "#4a7838",
    leafDark: "#305820",
    dot: "#7a9840",
  },
};

// ─── Assembled: Corner Cluster ───────────────────────────────────────────────
// Positioned at top-right; use CSS to mirror for other corners

export function FloralCornerCluster({
  palette,
  size = 220,
}: {
  palette: FloralPalette;
  size?: number;
}) {
  const { rose1: r1, rose2: r2, leaf: lg, leafDark: ld, dot } = palette;
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* Leaves — lowest layer */}
      <Leaf x={172} y={22} h={40} w={15} rotation={-38} color={ld} />
      <Leaf x={148} y={12} h={34} w={13} rotation={8} color={lg} opacity={0.85} />
      <Leaf x={198} y={52} h={32} w={12} rotation={-65} color={ld} opacity={0.9} />
      <Leaf x={120} y={38} h={30} w={11} rotation={22} color={lg} opacity={0.78} />
      <Leaf x={90} y={65} h={26} w={10} rotation={38} color={lg} opacity={0.8} />
      <Leaf x={158} y={92} h={28} w={11} rotation={-22} color={ld} opacity={0.82} />
      <Leaf x={102} y={112} h={24} w={9} rotation={14} color={lg} opacity={0.72} />
      <Leaf x={78} y={138} h={22} w={9} rotation={50} color={lg} opacity={0.68} />
      <Leaf x={130} y={155} h={20} w={8} rotation={-5} color={lg} opacity={0.7} />

      {/* Small blossoms — middle layer */}
      <Blossom x={108} y={72} r={9} color={r2.petal} center={r2.mid} opacity={0.88} />
      <Blossom x={82} y={102} r={8} color={r2.petal} center={r2.inner} opacity={0.82} />
      <Blossom x={142} y={148} r={8} color={r1.petal} center={r1.mid} opacity={0.75} />
      <Blossom x={70} y={158} r={7} color={r2.petal} center={r2.inner} opacity={0.7} />

      {/* Roses — top layer */}
      <Rose x={120} y={122} r={18} colors={r2} opacity={0.9} />
      <Rose x={143} y={40} r={20} colors={r2} opacity={0.88} />
      <Rose x={167} y={115} r={14} colors={r1} opacity={0.82} />
      <Rose x={172} y={65} r={26} colors={r1} opacity={0.96} />

      {/* Sparkle dots */}
      {[
        [96, 50],
        [134, 162],
        [190, 95],
        [80, 130],
        [155, 175],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={2.5} fill={dot} fillOpacity={0.78} />
      ))}
      {[
        [112, 36],
        [198, 75],
        [76, 82],
        [162, 188],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={1.5} fill={dot} fillOpacity={0.55} />
      ))}
    </svg>
  );
}

// ─── Assembled: Small Corner Accent (for all-4-corners style) ───────────────

export function FloralSmallCorner({
  palette,
  size = 120,
}: {
  palette: FloralPalette;
  size?: number;
}) {
  const { rose1: r1, rose2: r2, leaf: lg, leafDark: ld, dot } = palette;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <Leaf x={90} y={18} h={30} w={11} rotation={-35} color={ld} />
      <Leaf x={70} y={10} h={26} w={10} rotation={12} color={lg} opacity={0.85} />
      <Leaf x={108} y={45} h={24} w={9} rotation={-58} color={ld} opacity={0.88} />
      <Leaf x={52} y={32} h={22} w={8} rotation={28} color={lg} opacity={0.78} />
      <Leaf x={80} y={68} h={20} w={8} rotation={-18} color={lg} opacity={0.8} />

      <Blossom x={55} y={58} r={8} color={r2.petal} center={r2.mid} opacity={0.85} />
      <Rose x={70} y={68} r={15} colors={r2} opacity={0.88} />
      <Rose x={92} y={40} r={20} colors={r1} opacity={0.95} />

      {[[48, 28], [100, 75], [38, 75]].map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={2} fill={dot} fillOpacity={0.72} />
      ))}
    </svg>
  );
}

// ─── Assembled: Floral Wreath ────────────────────────────────────────────────

export function FloralWreath({
  palette,
  size = 320,
  gapDeg = 90,
}: {
  palette: FloralPalette;
  size?: number;
  /** degrees of gap at the top (opening for text/monogram) */
  gapDeg?: number;
}) {
  const { rose1: r1, rose2: r2, leaf: lg, leafDark: ld, dot } = palette;
  const cx = 160;
  const cy = 160;
  const R = 120;
  const half = gapDeg / 2;

  function polar(deg: number, r: number) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const leafAngles = [];
  for (let deg = half + 12; deg <= 360 - half - 12; deg += 18) {
    leafAngles.push(deg);
  }
  const rose1Angles = [120, 180, 240];
  const rose2Angles = [90, 150, 210, 270];
  const blossomAngles = [105, 135, 195, 255, 315 - half];

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* Leaves */}
      {leafAngles.map((deg) => {
        const pos = polar(deg, R);
        return (
          <Leaf
            key={deg}
            x={pos.x}
            y={pos.y}
            h={20}
            w={8}
            rotation={deg - 90}
            color={deg % 36 === 0 ? ld : lg}
            opacity={0.8}
          />
        );
      })}
      {/* Inner leaf accent */}
      {[110, 155, 200, 245, 295].map((deg) => {
        const pos = polar(deg, R - 18);
        return (
          <Leaf
            key={deg}
            x={pos.x}
            y={pos.y}
            h={15}
            w={7}
            rotation={deg - 90 + 40}
            color={lg}
            opacity={0.65}
          />
        );
      })}

      {/* Main roses */}
      {rose1Angles.map((deg) => {
        const pos = polar(deg, R);
        return <Rose key={deg} x={pos.x} y={pos.y} r={20} colors={r1} opacity={0.92} />;
      })}
      {rose2Angles.map((deg) => {
        const pos = polar(deg, R);
        return <Rose key={deg} x={pos.x} y={pos.y} r={15} colors={r2} opacity={0.88} />;
      })}
      {blossomAngles.map((deg) => {
        const pos = polar(deg, R + 6);
        return (
          <Blossom
            key={deg}
            x={pos.x}
            y={pos.y}
            r={9}
            color={r2.petal}
            center={r2.inner}
            opacity={0.8}
          />
        );
      })}

      {/* Dots */}
      {[80, 130, 170, 220, 260, 305].map((deg) => {
        const pos = polar(deg, R + 14);
        return (
          <circle key={deg} cx={pos.x} cy={pos.y} r={2.2} fill={dot} fillOpacity={0.65} />
        );
      })}
    </svg>
  );
}

// ─── Assembled: Geometric Gold Frame (Art Deco) ──────────────────────────────

export function GeometricFloralFrame({
  accent = "#d4af37",
  palette,
  width = 480,
  height = 600,
}: {
  accent?: string;
  palette: FloralPalette;
  width?: number;
  height?: number;
}) {
  const { rose1: r1, rose2: r2, leaf: lg } = palette;
  const cx = width / 2;
  const cy = height / 2;

  // Irregular hexagon / crystal shape
  const pts = [
    [cx, 32],
    [cx + 170, cy - 100],
    [cx + 200, cy + 120],
    [cx + 60, height - 28],
    [cx - 60, height - 28],
    [cx - 200, cy + 120],
    [cx - 170, cy - 100],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* Geometric frame */}
      <polygon
        points={pts}
        fill="none"
        stroke={accent}
        strokeWidth={1.8}
        opacity={0.9}
      />
      <polygon
        points={pts}
        fill="none"
        stroke={accent}
        strokeWidth={0.7}
        opacity={0.5}
        transform={`scale(0.94) translate(${cx * 0.06 + 2},${cy * 0.06 + 2})`}
      />

      {/* Top center flowers */}
      <Leaf x={cx - 18} y={58} h={28} w={10} rotation={-20} color={lg} />
      <Leaf x={cx + 18} y={58} h={28} w={10} rotation={20} color={lg} />
      <Rose x={cx} y={52} r={18} colors={r2} opacity={0.9} />

      {/* Top-right corner */}
      <Leaf x={cx + 155} y={cy - 85} h={26} w={10} rotation={45} color={lg} opacity={0.85} />
      <Leaf x={cx + 168} y={cy - 68} h={22} w={9} rotation={-30} color={lg} opacity={0.8} />
      <Rose x={cx + 158} y={cy - 88} r={15} colors={r1} opacity={0.88} />
      <Blossom x={cx + 148} y={cy - 62} r={9} color={r2.petal} center={r2.inner} opacity={0.8} />

      {/* Bottom-left corner */}
      <Leaf x={cx - 158} y={cy + 95} h={26} w={10} rotation={-140} color={lg} opacity={0.85} />
      <Leaf x={cx - 172} y={cy + 110} h={22} w={9} rotation={150} color={lg} opacity={0.8} />
      <Rose x={cx - 162} y={cy + 102} r={15} colors={r1} opacity={0.88} />
      <Blossom x={cx - 145} y={cy + 80} r={9} color={r2.petal} center={r2.inner} opacity={0.8} />

      {/* Bottom center */}
      <Leaf x={cx - 15} y={height - 44} h={26} w={10} rotation={-160} color={lg} />
      <Leaf x={cx + 15} y={height - 44} h={26} w={10} rotation={160} color={lg} />
      <Rose x={cx} y={height - 38} r={16} colors={r2} opacity={0.88} />

      {/* Gold dots along frame */}
      {[
        [cx + 80, 28],
        [cx - 80, 28],
        [cx + 192, cy - 20],
        [cx - 192, cy - 20],
        [cx + 130, height - 22],
        [cx - 130, height - 22],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={accent} fillOpacity={0.8} />
      ))}
    </svg>
  );
}

// ─── Assembled: Flowing Bottom Garland (Image 4 style) ──────────────────────

export function FloralGarland({
  palette,
  width = 500,
  size = 160,
}: {
  palette: FloralPalette;
  width?: number;
  size?: number;
}) {
  const { rose1: r1, rose2: r2, leaf: lg, leafDark: ld, dot } = palette;
  const h = size;
  const w = width;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* Sprawling leaves */}
      <Leaf x={w * 0.08} y={h * 0.7} h={38} w={14} rotation={160} color={lg} />
      <Leaf x={w * 0.15} y={h * 0.55} h={42} w={15} rotation={-150} color={ld} opacity={0.9} />
      <Leaf x={w * 0.22} y={h * 0.4} h={36} w={13} rotation={-120} color={lg} opacity={0.85} />
      <Leaf x={w * 0.32} y={h * 0.3} h={32} w={12} rotation={-90} color={ld} opacity={0.82} />
      <Leaf x={w * 0.42} y={h * 0.25} h={28} w={11} rotation={-70} color={lg} opacity={0.8} />
      <Leaf x={w * 0.52} y={h * 0.25} h={28} w={11} rotation={-110} color={lg} opacity={0.8} />
      <Leaf x={w * 0.62} y={h * 0.3} h={32} w={12} rotation={-90} color={ld} opacity={0.82} />
      <Leaf x={w * 0.72} y={h * 0.38} h={36} w={13} rotation={-60} color={lg} opacity={0.85} />
      <Leaf x={w * 0.82} y={h * 0.52} h={40} w={14} rotation={-30} color={ld} opacity={0.9} />
      <Leaf x={w * 0.9} y={h * 0.68} h={38} w={14} rotation={-15} color={lg} />

      {/* Side trailing leaves */}
      <Leaf x={w * 0.05} y={h * 0.85} h={30} w={12} rotation={-175} color={lg} opacity={0.75} />
      <Leaf x={w * 0.95} y={h * 0.82} h={30} w={12} rotation={-5} color={lg} opacity={0.75} />

      {/* Blossoms */}
      <Blossom x={w * 0.28} y={h * 0.55} r={10} color={r2.petal} center={r2.inner} opacity={0.85} />
      <Blossom x={w * 0.72} y={h * 0.55} r={10} color={r2.petal} center={r2.inner} opacity={0.85} />
      <Blossom x={w * 0.15} y={h * 0.78} r={9} color={r1.petal} center={r1.mid} opacity={0.8} />
      <Blossom x={w * 0.85} y={h * 0.75} r={9} color={r1.petal} center={r1.mid} opacity={0.8} />

      {/* Roses */}
      <Rose x={w * 0.18} y={h * 0.5} r={22} colors={r1} opacity={0.88} />
      <Rose x={w * 0.38} y={h * 0.38} r={18} colors={r2} opacity={0.88} />
      <Rose x={w * 0.5} y={h * 0.32} r={20} colors={r1} opacity={0.9} />
      <Rose x={w * 0.62} y={h * 0.38} r={18} colors={r2} opacity={0.88} />
      <Rose x={w * 0.82} y={h * 0.48} r={22} colors={r1} opacity={0.88} />

      {/* Small corner roses */}
      <Rose x={w * 0.06} y={h * 0.88} r={15} colors={r2} opacity={0.82} />
      <Rose x={w * 0.94} y={h * 0.85} r={15} colors={r2} opacity={0.82} />

      {/* Sparkle dots */}
      {[0.25, 0.45, 0.55, 0.75].map((t, i) => (
        <circle key={i} cx={w * t} cy={h * 0.15} r={2.2} fill={dot} fillOpacity={0.65} />
      ))}
    </svg>
  );
}

// ─── Assembled: Horizontal Divider ──────────────────────────────────────────

export function FloralDivider({
  palette,
  width = 280,
  height = 48,
}: {
  palette: FloralPalette;
  width?: number;
  height?: number;
}) {
  const { rose2: r2, leaf: lg } = palette;
  const cx = width / 2;
  const cy = height / 2;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden>
      <line
        x1={0}
        y1={cy}
        x2={cx - 22}
        y2={cy}
        stroke={r2.mid}
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <line
        x1={cx + 22}
        y1={cy}
        x2={width}
        y2={cy}
        stroke={r2.mid}
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Leaf x={cx - 12} y={cy + 8} h={16} w={6} rotation={-30} color={lg} />
      <Leaf x={cx + 12} y={cy + 8} h={16} w={6} rotation={30} color={lg} />
      <Blossom x={cx} y={cy} r={7} color={r2.petal} center={r2.inner} opacity={0.9} />
    </svg>
  );
}
