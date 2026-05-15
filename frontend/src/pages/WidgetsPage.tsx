import { widgets, activeTab } from "../lib/state";
import { renderWidget } from "../widgets/registry";

export function WidgetsPage() {
  return (
    <div class="grid">
      {Object.values(widgets.value).map((w) => (
        <div key={w.id} hidden={(w.tab ?? 0) !== activeTab.value}>
          {renderWidget(w)}
        </div>
      ))}
    </div>
  );
}
