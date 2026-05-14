import { ComponentType } from 'preact';
import type { Widget } from '../lib/state';
import { GenericCard } from './GenericCard';
import { TemperatureCard } from './TemperatureCard';
import { HumidityCard } from './HumidityCard';
import { IndicatorButtonCard } from './IndicatorButtonCard';

export const registry: Record<string, ComponentType<{ widget: Widget }>> = {
  gc: GenericCard,
  tc: TemperatureCard,
  hc: HumidityCard,
  ibc: IndicatorButtonCard,
};

export function renderWidget(widget: Widget) {
  const Comp = widget.t ? registry[widget.t] : undefined;
  if (!Comp) return null;
  return <Comp widget={widget} />;
}
