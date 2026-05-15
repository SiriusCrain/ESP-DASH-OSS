import { statistics } from "../lib/state";

export function StatsPage() {
  return (
    <ul class="stats-list">
      {Object.values(statistics.value).map((s) => (
        <li key={s.id}>
          <strong>{s.k}</strong>
          <code>{s.v}</code>
        </li>
      ))}
    </ul>
  );
}
