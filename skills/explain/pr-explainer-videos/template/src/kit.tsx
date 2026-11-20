import React, { createContext, useContext } from "react"
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"

export const COLORS = {
  background: "#0B0F17",
  panel: "#141B26",
  panelBorder: "#26324A",
  text: "#E9EEF5",
  muted: "#8A97AA",
  auto: "#4EA8FF",
  person: "#F5B544",
  fail: "#FF6B6B",
  pass: "#43D18A",
  ai: "#B48CFF"
}
export const FONT = '-apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'

export type Kind = "auto" | "person" | "neutral" | "fail" | "pass" | "ai"
export const kindColor = (kind: Kind) =>
  kind === "neutral" ? COLORS.panelBorder : COLORS[kind]

// Line start times (frames, relative to the scene) of the narration lines.
export const LineContext = createContext<number[]>([0])

export function useLineFrame(line: number, delaySeconds = 0) {
  const lineStarts = useContext(LineContext)
  const { fps } = useVideoConfig()
  const start = lineStarts[Math.min(line, lineStarts.length - 1)] ?? 0
  return start + Math.round(delaySeconds * fps)
}

export function useReveal(line: number, delaySeconds = 0) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const startFrame = useLineFrame(line, delaySeconds)
  return spring({ frame: frame - startFrame, fps, config: { damping: 200 }, durationInFrames: 18 })
}

export function useProgress(line: number, delaySeconds: number, seconds: number) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const startFrame = useLineFrame(line, delaySeconds)
  return interpolate(frame, [startFrame, startFrame + seconds * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })
}

type Place = { x: number; y: number; w?: number; h?: number }

export function Reveal({
  at,
  delay = 0,
  x,
  y,
  w,
  h,
  from = "up",
  children,
  style
}: Place & {
  at: number
  delay?: number
  from?: "up" | "left" | "scale" | "fade"
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const progress = useReveal(at, delay)
  const transform =
    from === "up"
      ? `translateY(${(1 - progress) * 24}px)`
      : from === "left"
        ? `translateX(${(1 - progress) * -40}px)`
        : from === "scale"
          ? `scale(${0.85 + 0.15 * progress})`
          : undefined
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        opacity: progress,
        transform,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export function Box({
  at,
  delay,
  x,
  y,
  w,
  h,
  kind = "neutral",
  title,
  sub,
  titleSize = 34,
  align = "center"
}: Place & {
  at: number
  delay?: number
  kind?: Kind
  title: React.ReactNode
  sub?: React.ReactNode
  titleSize?: number
  align?: "center" | "left"
}) {
  const color = kindColor(kind)
  return (
    <Reveal at={at} delay={delay} x={x} y={y} w={w} h={h} from="scale">
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderRadius: 18,
          border: `3px solid ${color}`,
          background: kind === "neutral" ? COLORS.panel : `${color}1A`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align,
          padding: "10px 22px",
          gap: 6
        }}
      >
        <div style={{ fontSize: titleSize, fontWeight: 700, color: COLORS.text, lineHeight: 1.15 }}>
          {title}
        </div>
        {sub ? (
          <div style={{ fontSize: Math.round(titleSize * 0.72), color: COLORS.muted, lineHeight: 1.2 }}>
            {sub}
          </div>
        ) : null}
      </div>
    </Reveal>
  )
}

export function Chip({
  children,
  kind = "neutral",
  size = 26,
  solid = false
}: {
  children: React.ReactNode
  kind?: Kind
  size?: number
  solid?: boolean
}) {
  const color = kind === "neutral" ? COLORS.muted : COLORS[kind]
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: `${size * 0.25}px ${size * 0.6}px`,
        borderRadius: 999,
        fontSize: size,
        fontWeight: 600,
        color: solid ? COLORS.background : color,
        background: solid ? color : `${color}22`,
        border: `2px solid ${color}`,
        whiteSpace: "nowrap"
      }}
    >
      {children}
    </span>
  )
}

export function Arrow({
  at,
  delay = 0,
  from,
  to,
  kind = "auto",
  label,
  labelOffset = [0, -34],
  labelWidth = 320,
  curve = 0,
  width = 4
}: {
  at: number
  delay?: number
  from: [number, number]
  to: [number, number]
  kind?: Kind
  label?: React.ReactNode
  labelOffset?: [number, number]
  labelWidth?: number
  curve?: number
  width?: number
}) {
  const draw = useProgress(at, delay, 0.6)
  const labelIn = useReveal(at, delay + 0.4)
  const color = kindColor(kind)
  const [x1, y1] = from
  const [x2, y2] = to
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2
  const length = Math.hypot(x2 - x1, y2 - y1)
  const normalX = -(y2 - y1) / length
  const normalY = (x2 - x1) / length
  const controlX = midX + normalX * curve
  const controlY = midY + normalY * curve
  const path = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`
  const pathLength = length * 1.2 + Math.abs(curve)
  const angle = Math.atan2(y2 - controlY, x2 - controlX)
  const head = 18
  const headPoints = [
    [x2, y2],
    [x2 - head * Math.cos(angle - 0.45), y2 - head * Math.sin(angle - 0.45)],
    [x2 - head * Math.cos(angle + 0.45), y2 - head * Math.sin(angle + 0.45)]
  ]
    .map((point) => point.join(","))
    .join(" ")
  const labelX = (x1 + 2 * controlX + x2) / 4
  const labelY = (y1 + 2 * controlY + y2) / 4
  return (
    <>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width={1920} height={1080}>
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={width}
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - draw)}
        />
        <polygon points={headPoints} fill={color} opacity={draw >= 0.98 ? 1 : 0} />
      </svg>
      {label ? (
        <div
          style={{
            position: "absolute",
            left: labelX + labelOffset[0] - labelWidth / 2,
            top: labelY + labelOffset[1] - 20,
            width: labelWidth,
            textAlign: "center",
            opacity: labelIn,
            fontSize: 24,
            fontWeight: 600,
            color: kind === "neutral" ? COLORS.muted : color,
            lineHeight: 1.2
          }}
        >
          {label}
        </div>
      ) : null}
    </>
  )
}

export function Header({ tag, title }: { tag?: string; title: string }) {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" })
  return (
    <div style={{ position: "absolute", left: 80, top: 54, opacity }}>
      {tag ? (
        <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.auto, letterSpacing: 2, textTransform: "uppercase" }}>
          {tag}
        </div>
      ) : null}
      <div style={{ fontSize: 58, fontWeight: 800, color: COLORS.text, marginTop: 4 }}>{title}</div>
    </div>
  )
}

// One short caption per narration line, at the bottom of the frame.
export function Captions({ lines }: { lines: string[] }) {
  const frame = useCurrentFrame()
  const lineStarts = useContext(LineContext)
  let current = 0
  for (let index = 0; index < lineStarts.length; index++) if (frame >= lineStarts[index]) current = index
  const text = lines[current]
  if (!text) return null
  const start = lineStarts[current] ?? 0
  const opacity = interpolate(frame, [start, start + 8], [0, 1], { extrapolateRight: "clamp" })
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 34,
        display: "flex",
        justifyContent: "center",
        opacity
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 600,
          color: COLORS.text,
          background: "#00000088",
          border: `1px solid ${COLORS.panelBorder}`,
          padding: "10px 28px",
          borderRadius: 14,
          maxWidth: 1600,
          textAlign: "center"
        }}
      >
        {text}
      </div>
    </div>
  )
}

export function Counter({
  at,
  delay = 0,
  from = 0,
  to,
  seconds = 1,
  format = (value: number) => String(Math.round(value))
}: {
  at: number
  delay?: number
  from?: number
  to: number
  seconds?: number
  format?: (value: number) => string
}) {
  const progress = useProgress(at, delay, seconds)
  const eased = 1 - (1 - progress) ** 3
  return <>{format(from + (to - from) * eased)}</>
}

export function Panel({
  children,
  kind = "neutral",
  style
}: {
  children: React.ReactNode
  kind?: Kind
  style?: React.CSSProperties
}) {
  const color = kindColor(kind)
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: 18,
        border: `2px solid ${color}`,
        background: COLORS.panel,
        padding: 24,
        ...style
      }}
    >
      {children}
    </div>
  )
}

export function Bubble({
  role,
  time,
  children
}: {
  role: "customer" | "agent"
  time: string
  children: React.ReactNode
}) {
  const customer = role === "customer"
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: customer ? "flex-start" : "flex-end" }}>
      <div style={{ fontSize: 20, color: COLORS.muted, marginBottom: 4 }}>
        {customer ? "Customer" : "Agent"} · {time}
      </div>
      <div
        style={{
          maxWidth: 560,
          fontSize: 28,
          lineHeight: 1.3,
          color: COLORS.text,
          padding: "14px 20px",
          borderRadius: 16,
          background: customer ? "#1F2A3C" : "#2A2140",
          border: `2px solid ${customer ? "#33435E" : "#4A3A70"}`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function Dot({ color, size = 18, style }: { color: string; size?: number; style?: React.CSSProperties }) {
  return <div style={{ width: size, height: size, borderRadius: size, background: color, ...style }} />
}
