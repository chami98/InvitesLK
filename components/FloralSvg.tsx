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

// ─── Sri Lankan Traditional Components ──────────────────────────────────────

export type LotusPalette = {
  outer: string;
  inner: string;
  center: string;
  leaf: string;
  leafDark: string;
  dot: string;
};

export const LOTUS_PALETTES: Record<string, LotusPalette> = {
  saffronGold: {
    outer: "#f59e0b",
    inner: "#fde68a",
    center: "#d97706",
    leaf: "#4a7a28",
    leafDark: "#2d5810",
    dot: "#d4af37",
  },
  kandyanRed: {
    outer: "#dc2626",
    inner: "#fef3c7",
    center: "#d97706",
    leaf: "#4a6820",
    leafDark: "#2d4a10",
    dot: "#d4af37",
  },
  jasminePink: {
    outer: "#fde68a",
    inner: "#fffbeb",
    center: "#d97706",
    leaf: "#4a7828",
    leafDark: "#2d5818",
    dot: "#7c3aed",
  },
};

function Lotus({
  x = 0,
  y = 0,
  r = 24,
  outerColor,
  innerColor,
  centerColor,
  opacity = 1,
}: {
  x?: number;
  y?: number;
  r: number;
  outerColor: string;
  innerColor: string;
  centerColor: string;
  opacity?: number;
}) {
  const O8 = [0, 45, 90, 135, 180, 225, 270, 315];
  const I8 = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {O8.map((a) => (
        <ellipse
          key={`o${a}`}
          cx={0}
          cy={-r * 0.62}
          rx={r * 0.22}
          ry={r * 0.62}
          fill={outerColor}
          fillOpacity={0.7}
          transform={`rotate(${a})`}
        />
      ))}
      {I8.map((a) => (
        <ellipse
          key={`i${a}`}
          cx={0}
          cy={-r * 0.38}
          rx={r * 0.16}
          ry={r * 0.4}
          fill={innerColor}
          fillOpacity={0.88}
          transform={`rotate(${a})`}
        />
      ))}
      <circle cx={0} cy={0} r={r * 0.22} fill={centerColor} fillOpacity={0.95} />
      <circle cx={0} cy={0} r={r * 0.1} fill={outerColor} fillOpacity={0.55} />
    </g>
  );
}

// ─── Assembled: Oil Lamp (Agal Pethi) ────────────────────────────────────────

export function OilLampSvg({
  color = "#d4af37",
  flame = "#f59e0b",
  width = 70,
  height = 110,
}: {
  color?: string;
  flame?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 70 110" width={width} height={height} aria-hidden>
      <ellipse cx={35} cy={100} rx={26} ry={5.5} fill={color} fillOpacity={0.68} />
      <path d="M 24 100 L 27 83 L 43 83 L 46 100 Z" fill={color} fillOpacity={0.78} />
      <ellipse cx={35} cy={81} rx={13} ry={5} fill={color} fillOpacity={0.85} />
      <path d="M 30 81 L 28 66 L 42 66 L 40 81 Z" fill={color} fillOpacity={0.72} />
      <ellipse cx={35} cy={64} rx={21} ry={6.5} fill={color} fillOpacity={0.9} />
      <path d="M 14 64 Q 22 76 35 73 Q 48 76 56 64 Z" fill={color} fillOpacity={0.45} />
      <ellipse cx={35} cy={57} rx={6} ry={3} fill={color} />
      <path d="M 30 56 C 28 44 30 35 35 26 C 40 35 42 44 40 56 Z" fill={flame} fillOpacity={0.88} />
      <path d="M 33 55 C 31 47 33 40 35 34 C 37 40 39 47 37 55 Z" fill="#fff7ed" fillOpacity={0.82} />
      <path d="M 34 54 C 33 49 34 43 35 39 C 36 43 37 49 36 54 Z" fill="white" fillOpacity={0.55} />
    </svg>
  );
}

// ─── Assembled: Lotus Corner Decoration ──────────────────────────────────────

export function LotusCornerDecor({
  lotusPalette,
  size = 120,
}: {
  lotusPalette: LotusPalette;
  size?: number;
}) {
  const { outer, inner, center, leaf, leafDark, dot } = lotusPalette;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <Leaf x={90} y={18} h={28} w={10} rotation={-35} color={leafDark} />
      <Leaf x={70} y={10} h={24} w={9} rotation={12} color={leaf} opacity={0.85} />
      <Leaf x={108} y={45} h={22} w={8} rotation={-58} color={leafDark} opacity={0.88} />
      <Leaf x={52} y={32} h={20} w={8} rotation={28} color={leaf} opacity={0.78} />
      <Leaf x={80} y={68} h={18} w={7} rotation={-18} color={leaf} opacity={0.8} />
      <Lotus
        x={70}
        y={68}
        r={14}
        outerColor={outer}
        innerColor={inner}
        centerColor={center}
        opacity={0.88}
      />
      <Lotus
        x={92}
        y={40}
        r={20}
        outerColor={outer}
        innerColor={inner}
        centerColor={center}
        opacity={0.95}
      />
      {([
        [48, 28],
        [100, 75],
        [38, 75],
      ] as [number, number][]).map(([dx, dy], i) => (
        <circle key={i} cx={dx} cy={dy} r={2} fill={dot} fillOpacity={0.72} />
      ))}
    </svg>
  );
}

// ─── Assembled: Lotus Wreath ──────────────────────────────────────────────────

export function LotusWreath({
  lotusPalette,
  size = 320,
}: {
  lotusPalette: LotusPalette;
  size?: number;
}) {
  const { outer, inner, center, leaf, leafDark, dot } = lotusPalette;
  const cx = 160;
  const cy = 160;
  const R = 115;

  function polar(deg: number, r: number) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  const leafAngles: number[] = [];
  for (let deg = 0; deg < 360; deg += 15) leafAngles.push(deg);
  const lotusAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const dotAngles = [22, 67, 112, 157, 202, 247, 292, 337];

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {leafAngles.map((deg) => {
        const pos = polar(deg, R);
        return (
          <Leaf
            key={deg}
            x={pos.x}
            y={pos.y}
            h={16}
            w={6}
            rotation={deg - 90}
            color={deg % 30 === 0 ? leafDark : leaf}
            opacity={0.7}
          />
        );
      })}
      {lotusAngles.map((deg) => {
        const pos = polar(deg, R);
        return (
          <Lotus
            key={deg}
            x={pos.x}
            y={pos.y}
            r={18}
            outerColor={outer}
            innerColor={inner}
            centerColor={center}
            opacity={0.88}
          />
        );
      })}
      {dotAngles.map((deg) => {
        const pos = polar(deg, R + 14);
        return (
          <circle key={deg} cx={pos.x} cy={pos.y} r={2.2} fill={dot} fillOpacity={0.65} />
        );
      })}
    </svg>
  );
}

// ─── Assembled: Traditional Border Frame (Poruwa-style) ──────────────────────

export function TraditionalBorderFrame({
  accent = "#d4af37",
  secondary = "#c8860a",
  lotusPalette,
  width = 400,
  height = 580,
}: {
  accent?: string;
  secondary?: string;
  lotusPalette: LotusPalette;
  width?: number;
  height?: number;
}) {
  const pad = 16;
  const { outer, inner, center, leaf, leafDark } = lotusPalette;
  const dSize = 7;
  const dSp = 26;

  const topDs: number[] = [];
  for (let x = pad + 36; x < width - pad - 24; x += dSp) topDs.push(x);
  const sideDs: number[] = [];
  for (let y = pad + 36; y < height - pad - 24; y += dSp) sideDs.push(y);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <rect
        x={pad}
        y={pad}
        width={width - 2 * pad}
        height={height - 2 * pad}
        fill="none"
        stroke={accent}
        strokeWidth={2.5}
      />
      <rect
        x={pad + 10}
        y={pad + 10}
        width={width - 2 * (pad + 10)}
        height={height - 2 * (pad + 10)}
        fill="none"
        stroke={secondary}
        strokeWidth={0.9}
        strokeOpacity={0.55}
      />
      {topDs.map((x, i) => (
        <rect
          key={`td${i}`}
          x={x - dSize / 2}
          y={pad - dSize / 2}
          width={dSize}
          height={dSize}
          fill={accent}
          fillOpacity={0.65}
          transform={`rotate(45,${x},${pad})`}
        />
      ))}
      {topDs.map((x, i) => (
        <rect
          key={`bd${i}`}
          x={x - dSize / 2}
          y={height - pad - dSize / 2}
          width={dSize}
          height={dSize}
          fill={accent}
          fillOpacity={0.65}
          transform={`rotate(45,${x},${height - pad})`}
        />
      ))}
      {sideDs.map((y, i) => (
        <rect
          key={`ld${i}`}
          x={pad - dSize / 2}
          y={y - dSize / 2}
          width={dSize}
          height={dSize}
          fill={accent}
          fillOpacity={0.65}
          transform={`rotate(45,${pad},${y})`}
        />
      ))}
      {sideDs.map((y, i) => (
        <rect
          key={`rd${i}`}
          x={width - pad - dSize / 2}
          y={y - dSize / 2}
          width={dSize}
          height={dSize}
          fill={accent}
          fillOpacity={0.65}
          transform={`rotate(45,${width - pad},${y})`}
        />
      ))}
      {([
        [pad, pad],
        [width - pad, pad],
        [pad, height - pad],
        [width - pad, height - pad],
      ] as [number, number][]).map(([qx, qy], i) => (
        <rect
          key={`cd${i}`}
          x={qx - 9}
          y={qy - 9}
          width={18}
          height={18}
          fill={accent}
          fillOpacity={0.88}
          transform={`rotate(45,${qx},${qy})`}
        />
      ))}
      <Lotus x={pad + 30} y={pad + 30} r={16} outerColor={outer} innerColor={inner} centerColor={center} opacity={0.8} />
      <Lotus x={width - pad - 30} y={pad + 30} r={16} outerColor={outer} innerColor={inner} centerColor={center} opacity={0.8} />
      <Lotus x={pad + 30} y={height - pad - 30} r={16} outerColor={outer} innerColor={inner} centerColor={center} opacity={0.8} />
      <Lotus x={width - pad - 30} y={height - pad - 30} r={16} outerColor={outer} innerColor={inner} centerColor={center} opacity={0.8} />
      <Leaf x={pad + 54} y={pad + 18} h={16} w={6} rotation={-28} color={leafDark} opacity={0.7} />
      <Leaf x={pad + 18} y={pad + 54} h={16} w={6} rotation={62} color={leaf} opacity={0.7} />
      <Leaf x={width - pad - 54} y={pad + 18} h={16} w={6} rotation={28} color={leafDark} opacity={0.7} />
      <Leaf x={width - pad - 18} y={pad + 54} h={16} w={6} rotation={-62} color={leaf} opacity={0.7} />
      <Leaf x={pad + 54} y={height - pad - 18} h={16} w={6} rotation={-152} color={leafDark} opacity={0.7} />
      <Leaf x={pad + 18} y={height - pad - 54} h={16} w={6} rotation={118} color={leaf} opacity={0.7} />
      <Leaf x={width - pad - 54} y={height - pad - 18} h={16} w={6} rotation={152} color={leafDark} opacity={0.7} />
      <Leaf x={width - pad - 18} y={height - pad - 54} h={16} w={6} rotation={-118} color={leaf} opacity={0.7} />
    </svg>
  );
}

// ─── Assembled: Geometric Kolam Frame (Tamil-style) ──────────────────────────

export function GeometricKolaamFrame({
  color1 = "#7c3aed",
  color2 = "#d97706",
  width = 420,
  height = 600,
}: {
  color1?: string;
  color2?: string;
  width?: number;
  height?: number;
}) {
  const pad = 14;
  const corners = [
    [pad + 16, pad + 16],
    [width - pad - 16, pad + 16],
    [pad + 16, height - pad - 16],
    [width - pad - 16, height - pad - 16],
  ] as [number, number][];

  const edgeTop: number[] = [];
  for (let x = pad + 40; x < width - pad - 26; x += 22) edgeTop.push(x);
  const edgeSide: number[] = [];
  for (let y = pad + 40; y < height - pad - 26; y += 22) edgeSide.push(y);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <rect x={pad} y={pad} width={width - 2 * pad} height={height - 2 * pad} fill="none" stroke={color1} strokeWidth={2.2} strokeOpacity={0.85} />
      <rect x={pad + 7} y={pad + 7} width={width - 2 * (pad + 7)} height={height - 2 * (pad + 7)} fill="none" stroke={color2} strokeWidth={0.7} strokeOpacity={0.5} />
      <rect x={pad + 12} y={pad + 12} width={width - 2 * (pad + 12)} height={height - 2 * (pad + 12)} fill="none" stroke={color1} strokeWidth={1} strokeOpacity={0.35} />
      {corners.map(([qx, qy], i) => (
        <g key={`corner${i}`}>
          <circle cx={qx} cy={qy} r={14} fill="none" stroke={color1} strokeWidth={0.8} strokeOpacity={0.55} />
          <circle cx={qx} cy={qy} r={9} fill={color2} fillOpacity={0.15} stroke={color2} strokeWidth={0.7} strokeOpacity={0.7} />
          <circle cx={qx} cy={qy} r={4} fill={color2} fillOpacity={0.85} />
          <line x1={qx - 16} y1={qy} x2={qx + 16} y2={qy} stroke={color2} strokeWidth={0.7} strokeOpacity={0.45} />
          <line x1={qx} y1={qy - 16} x2={qx} y2={qy + 16} stroke={color2} strokeWidth={0.7} strokeOpacity={0.45} />
          {[45, 135, 225, 315].map((a) => {
            const pr = 12;
            const rad = (a * Math.PI) / 180;
            return (
              <circle
                key={a}
                cx={qx + pr * Math.cos(rad)}
                cy={qy + pr * Math.sin(rad)}
                r={1.8}
                fill={color1}
                fillOpacity={0.6}
              />
            );
          })}
        </g>
      ))}
      {edgeTop.map((x, i) => (
        <g key={`et${i}`}>
          <circle cx={x} cy={pad} r={3.5} fill={color1} fillOpacity={0.45} />
          <circle cx={x} cy={pad} r={1.8} fill={color2} fillOpacity={0.88} />
        </g>
      ))}
      {edgeTop.map((x, i) => (
        <g key={`eb${i}`}>
          <circle cx={x} cy={height - pad} r={3.5} fill={color1} fillOpacity={0.45} />
          <circle cx={x} cy={height - pad} r={1.8} fill={color2} fillOpacity={0.88} />
        </g>
      ))}
      {edgeSide.map((y, i) => (
        <g key={`el${i}`}>
          <circle cx={pad} cy={y} r={3.5} fill={color1} fillOpacity={0.45} />
          <circle cx={pad} cy={y} r={1.8} fill={color2} fillOpacity={0.88} />
        </g>
      ))}
      {edgeSide.map((y, i) => (
        <g key={`er${i}`}>
          <circle cx={width - pad} cy={y} r={3.5} fill={color1} fillOpacity={0.45} />
          <circle cx={width - pad} cy={y} r={1.8} fill={color2} fillOpacity={0.88} />
        </g>
      ))}
    </svg>
  );
}
