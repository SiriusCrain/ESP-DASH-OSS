import { activeTab, STATISTICS_VIEW } from "./lib/state";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { StatsPage } from "./pages/StatsPage";
import { WidgetsPage } from "./pages/WidgetsPage";

export function App() {
  return (
    <div class="layout">
      <Sidebar />
      <div class="layout-main">
        <Header />
        <main>
          {activeTab.value === STATISTICS_VIEW ? (
            <StatsPage />
          ) : (
            <WidgetsPage />
          )}
        </main>
      </div>
    </div>
  );
}
