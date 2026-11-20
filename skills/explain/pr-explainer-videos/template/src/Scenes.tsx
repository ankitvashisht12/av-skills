import React from "react"
import { Arrow, Box, Captions, Chip, Header, Reveal } from "./kit"

// One component per scene id in tools/script.json.
// `at={n}` = appear when narration line n starts. Captions: one short label per line.
// Full worked example: ../examples/evals-full-loop/src/Scenes.tsx

function Overview() {
  return (
    <>
      <Header tag="Feature · end to end" title="One chat, the whole path" />
      <Box at={0} x={160} y={420} w={340} h={130} kind="auto" title="Conversation" sub="saved at once" />
      <Arrow at={0} delay={0.4} from={[510, 485]} to={[780, 485]} label="every 2 h" />
      <Box at={0} delay={0.6} x={790} y={420} w={340} h={130} kind="auto" title="Findings run" sub="AI reads it" />
      <Arrow at={0} delay={1} from={[1140, 485]} to={[1410, 485]} kind="person" label="a person reads" />
      <Box at={0} delay={1.2} x={1420} y={420} w={340} h={130} kind="person" title="Confirm" sub="a person" />
      <Reveal at={1} x={1080} y={230} w={680}>
        <div style={{ display: "flex", gap: 18, justifyContent: "flex-end" }}>
          <Chip kind="auto" size={28}>● runs by itself</Chip>
          <Chip kind="person" size={28}>● needs a person</Chip>
        </div>
      </Reveal>
      <Captions lines={["Follow one chat", "Blue = automatic · Amber = a person"]} />
    </>
  )
}

function StepOne() {
  return (
    <>
      <Header tag="Step 1" title="What starts it" />
      <Box at={0} x={160} y={300} w={520} h={150} kind="auto" title="Timer" sub="every 2 hours" />
      <Arrow at={0} delay={0.4} from={[690, 375]} to={[960, 375]} />
      <Box at={0} delay={0.6} x={970} y={300} w={620} h={150} kind="neutral" title="New chats?" sub="since the last run" />
      <Box at={1} x={970} y={520} w={620} h={130} kind="fail" title="No → no run" titleSize={32} />
      <Captions lines={["Timer: every 2 hours", "Nothing new → no run"]} />
    </>
  )
}

export const SCENES: Record<string, React.FC> = {
  overview: Overview,
  "step-one": StepOne
}
