import React from "react"
import { AbsoluteFill, Audio, Series, staticFile } from "remotion"
import durations from "./durations.json"
import { COLORS, FONT, LineContext } from "./kit"
import { SCENES } from "./Scenes"

export const FPS = 30
type SceneTiming = { seconds: number; lineStarts: number[] }
const timings = durations as Record<string, SceneTiming>

export const totalFrames = () =>
  Object.keys(SCENES).reduce((sum, id) => sum + Math.ceil(timings[id].seconds * FPS), 0)

// Scene order = order of tools/script.json (durations.json keeps that order).
export function Explainer() {
  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: FONT }}>
      <Series>
        {Object.keys(timings).map((id) => {
          const Component = SCENES[id]
          if (!Component) throw new Error(`No scene component for "${id}" in Scenes.tsx`)
          return (
            <Series.Sequence key={id} durationInFrames={Math.ceil(timings[id].seconds * FPS)}>
              <LineContext.Provider value={timings[id].lineStarts.map((start) => Math.round(start * FPS))}>
                <AbsoluteFill style={{ background: COLORS.background }}>
                  <Component />
                </AbsoluteFill>
              </LineContext.Provider>
              <Audio src={staticFile(`audio/${id}.wav`)} />
            </Series.Sequence>
          )
        })}
      </Series>
    </AbsoluteFill>
  )
}
