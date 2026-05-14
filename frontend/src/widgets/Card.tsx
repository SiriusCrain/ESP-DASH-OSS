import { ComponentChildren } from "preact";

type Tone = "neutral" | "danger" | "info" | "success" | "warning";

interface CardProps {
  name: string;
  value: ComponentChildren;
  icon: ComponentChildren;
  tone?: Tone;
}

export function Card({ name, value, icon, tone = "neutral" }: CardProps) {
  return (
    <div class="card">
      <div class={`card-icon card-icon--${tone}`}>{icon}</div>
      <div class="card-body">
        <div class="card-name">{name}</div>
        <div class="card-value">{value}</div>
      </div>
    </div>
  );
}
