import { ComponentType } from 'preact';
import type { Widget } from '../lib/state';

export const registry: Record<string, ComponentType<{ widget: Widget }>> = {};

export function renderWidget(widget: Widget) {
  const Comp = widget.t ? registry[widget.t] : undefined;
  if (!Comp) return null;
  return <Comp widget={widget} />;
}
