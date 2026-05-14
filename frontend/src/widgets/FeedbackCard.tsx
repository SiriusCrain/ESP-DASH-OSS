import { LucideIcon } from "lucide-react-sprite";
import type { Widget } from "../lib/state";

const variants = [
  ["neutral", <LucideIcon name="circle-dashed" size={24} />],
  ["neutral", <LucideIcon name="info" size={24} />],
  ["success", <LucideIcon name="circle-check" size={24} />],
  ["warning", <LucideIcon name="triangle-alert" size={24} />],
  ["danger", <LucideIcon name="circle-x" size={24} />],
] as const;

export function FeedbackCard({ widget }: { widget: Widget }) {
  const [color, icon] = variants[Number(widget.s)];

  return (
    <div class="card">
      <div class={`card-icon card-icon--${color}`}>{icon}</div>
      <div class="card-body">
        <div class="card-name">{widget.n}</div>
        <div class="card-value">{widget.v}</div>
      </div>
    </div>
  );
}
