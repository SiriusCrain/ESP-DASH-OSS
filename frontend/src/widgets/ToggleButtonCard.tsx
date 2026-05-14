import { LucideIcon } from "lucide-react-sprite";
import type { Widget } from "../lib/state";
import { sendEvent } from "../lib/ws";

export function ToggleButtonCard({ widget }: { widget: Widget }) {
  return (
    <div class="card card--button-right">
      <div class="card-name">{widget.n}</div>
      <button
        type="button"
        class={`card-icon card-icon--button card-icon--${widget.v ? "filled-green" : "filled-grey"}`}
        aria-label={widget.n}
        onClick={() => sendEvent(widget.id, !widget.v)}
      >
        {widget.v ? (
          <LucideIcon name="check" size={24} />
        ) : (
          <LucideIcon name="x" size={24} />
        )}
      </button>
    </div>
  );
}
