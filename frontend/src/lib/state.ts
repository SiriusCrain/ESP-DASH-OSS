import { signal } from '@preact/signals';
import * as v from 'valibot';

const Value = v.union([v.string(), v.number(), v.boolean()]);
const Axis = v.union([v.string(), v.number()]);

export const WidgetSchema = v.object({
  id: v.number(),
  t: v.optional(v.string()),
  n: v.optional(v.string()),
  v: v.optional(Value),
  s: v.optional(Value),
  min: v.optional(v.number()),
  max: v.optional(v.number()),
  step: v.optional(v.number()),
  x: v.optional(v.array(Axis)),
  y: v.optional(v.array(Axis)),
  show: v.optional(v.boolean()),
  status: v.optional(v.number()),
});
export type Widget = v.InferOutput<typeof WidgetSchema>;

export const StatisticSchema = v.object({
  id: v.number(),
  k: v.optional(v.string()),
  v: v.optional(Value),
});
export type Statistic = v.InferOutput<typeof StatisticSchema>;

export const FrameSchema = v.object({
  command: v.picklist([
    'update:layout:begin',
    'update:layout:next',
    'update:components',
    'pong',
  ]),
  widgets: v.optional(v.array(WidgetSchema)),
  statistics: v.optional(v.array(StatisticSchema)),
});

export const connected = signal(false);
export const widgets = signal<Record<number, Widget>>({});
export const statistics = signal<Record<number, Statistic>>({});
