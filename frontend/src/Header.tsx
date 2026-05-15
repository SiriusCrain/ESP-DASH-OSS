import { LucideIcon } from "lucide-react-sprite";
import { activeTab, tabs, sidebarOpen, STATISTICS_VIEW } from "./lib/state";

const builtInTitles: Record<number, string> = {
  0: "Overview",
  [STATISTICS_VIEW]: "Statistics",
};

export function Header() {
  return (
    <header class="hdr">
      <button
        type="button"
        class="hdr-toggle"
        aria-label="Toggle sidebar"
        onClick={() => {
          sidebarOpen.value = !sidebarOpen.value;
        }}
      >
        <LucideIcon name="panel-left" size={20} />
      </button>
      <span class="hdr-sep" />
      <h1>
        {builtInTitles[activeTab.value] ?? tabs.value[activeTab.value]?.n}
      </h1>
    </header>
  );
}
