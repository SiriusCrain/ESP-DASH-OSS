import type { Widget } from '../lib/state';

export function ProgressCard({ widget }: { widget: Widget }) {
  const value = Number(widget.v ?? 0);
  const min = widget.min ?? 0;
  const max = widget.max ?? 100;
  const range = max - min;
  const pct = range > 0 ? Math.max(0, Math.min(100, ((value - min) / range) * 100)) : 0;

  return (
    <div class="card card--progress">
      <div class="progress-head">
        <div class="card-name">{widget.n ?? `#${widget.id}`}</div>
        <div class="card-value">
          {widget.v ?? 0}
          {widget.s ? <span class="card-symbol"> {widget.s}</span> : null}
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
