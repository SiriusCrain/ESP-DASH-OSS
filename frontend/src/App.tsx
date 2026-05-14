import { connected, widgets, statistics } from "./lib/state";
import { renderWidget } from "./widgets/registry";

export function App() {
  const ws = Object.values(widgets.value);
  const ss = Object.values(statistics.value);
  const on = connected.value;

  return (
    <>
      <header class="hdr">
        <h1>ESP-DASH</h1>
        <span
          class={`dot${on ? " on" : ""}`}
          title={on ? "connected" : "disconnected"}
        />
      </header>

      <main>
        <section>
          <h2>
            Widgets <small>({ws.length})</small>
          </h2>
          {ws.length === 0 ? (
            <p class="muted">No widgets yet.</p>
          ) : (
            <div class="grid">
              {ws.map((w) => (
                <div key={w.id}>{renderWidget(w)}</div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2>
            Statistics <small>({ss.length})</small>
          </h2>
          {ss.length === 0 ? (
            <p class="muted">No statistics yet.</p>
          ) : (
            <ul class="stats-list">
              {ss.map((s) => (
                <li key={s.id}>
                  <strong>{s.k ?? `#${s.id}`}</strong>
                  <code>{JSON.stringify(s.v)}</code>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer>
        <small>ESP-DASH OSS · Preact</small>
      </footer>
    </>
  );
}
