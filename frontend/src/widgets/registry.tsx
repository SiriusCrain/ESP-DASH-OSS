import { ComponentType } from "preact";
import type { Widget } from "../lib/state";
import { GenericCard } from "./GenericCard";
import { TemperatureCard } from "./TemperatureCard";
import { HumidityCard } from "./HumidityCard";
import { IndicatorButtonCard } from "./IndicatorButtonCard";
import { ProgressCard } from "./ProgressCard";
import { FeedbackCard } from "./FeedbackCard";
import { ToggleButtonCard } from "./ToggleButtonCard";

export const registry: Record<string, ComponentType<{ widget: Widget }>> = {
  gc: GenericCard,
  tc: TemperatureCard,
  hc: HumidityCard,
  ibc: IndicatorButtonCard,
  pc: ProgressCard,
  fc: FeedbackCard,
  tbc: ToggleButtonCard,
};

export function renderWidget(widget: Widget) {
  const Comp = widget.t ? registry[widget.t] : undefined;
  if (!Comp) return null;
  return <Comp widget={widget} />;
}
