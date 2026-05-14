import { LucideIcon } from 'lucide-react-sprite';
import type { Widget } from '../lib/state';
import { Card } from './Card';

export function TemperatureCard({ widget }: { widget: Widget }) {
  return (
    <Card
      tone="danger"
      icon={<LucideIcon name="thermometer" size={24} />}
      name={widget.n ?? `#${widget.id}`}
      value={
        <>
          {widget.v ?? ''}
          {widget.s ? <span class="card-symbol"> {widget.s}</span> : null}
        </>
      }
    />
  );
}
