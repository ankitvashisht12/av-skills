import React from "react"
import { Composition } from "remotion"
import { Explainer, FPS, totalFrames } from "./Video"

export function Root() {
  return <Composition id="Explainer" component={Explainer} durationInFrames={totalFrames()} fps={FPS} width={1920} height={1080} />
}
