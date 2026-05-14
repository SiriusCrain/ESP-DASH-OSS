import type { Widget } from "../lib/state";
import { sendEvent } from "../lib/ws";

const STATUS_COLOR: Record<number, string> = {
  0: "transparent",
  1: "#22d3ee", // INFO    — cyan
  2: "#22c55e", // SUCCESS — green
  3: "#eab308", // WARNING — yellow
  4: "#ef4444", // DANGER  — red
};

export function IndicatorButtonCard({ widget }: { widget: Widget }) {
  const show = widget.show === true;
  const status = widget.status ?? 0;
  const dotColor = show
    ? (STATUS_COLOR[status] ?? "transparent")
    : "transparent";

  return (
    <div class="card card--button-right">
      <div class="card-name">{widget.n ?? `#${widget.id}`}</div>
      <button
        type="button"
        class="card-icon card-icon--filled-blue card-icon--button"
        aria-label={widget.n ?? "Indicator button"}
        onClick={() => sendEvent(widget.id)}
      >
        <span class="ibtn-ring" />
        <span class="ibtn-dot" style={{ background: dotColor }} />
      </button>
    </div>
  );
}
