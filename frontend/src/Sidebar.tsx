import { LucideIcon } from "lucide-react-sprite";
import {
  tabs,
  activeTab,
  connected,
  sidebarOpen,
  STATISTICS_VIEW,
} from "./lib/state";

const tabIcons = [
  <LucideIcon name="house" size={20} />, // 0 UNASSIGNED → home (Overview)
  <LucideIcon name="house" size={20} />, // 1 HOME
  <LucideIcon name="cog" size={20} />, // 2 COG
  <LucideIcon name="sun" size={20} />, // 3 SUN
  <LucideIcon name="moon" size={20} />, // 4 MOON
  <LucideIcon name="sun-moon" size={20} />, // 5 SUN_MOON
  <LucideIcon name="database" size={20} />, // 6 DATABASE
  <LucideIcon name="monitor" size={20} />, // 7 COMPUTER
  <LucideIcon name="activity" size={20} />, // 8 ACTIVITY
  <LucideIcon name="alarm-clock" size={20} />, // 9 ALARM
  <LucideIcon name="volume-2" size={20} />, // 10 AUDIO
  <LucideIcon name="joystick" size={20} />, // 11 JOYSTICK
];

interface ItemProps {
  view: number;
  icon: preact.ComponentChildren;
  label: string;
}

function Item({ view, icon, label }: ItemProps) {
  const active = activeTab.value === view;
  return (
    <button
      type="button"
      class={`sidebar-item${active ? " sidebar-item--active" : ""}`}
      onClick={() => {
        activeTab.value = view;
      }}
    >
      <span class="sidebar-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function Sidebar() {
  return (
    <>
      {sidebarOpen.value && (
        <div
          class="sidebar-backdrop"
          onClick={() => {
            sidebarOpen.value = false;
          }}
        />
      )}
      <aside class={`sidebar${sidebarOpen.value ? "" : " sidebar--closed"}`}>
        <div class="sidebar-brand">ESP-DASH-OSS</div>

        <nav class="sidebar-nav">
          <Item view={0} icon={tabIcons[1]} label="Overview" />
          {Object.values(tabs.value).map((t) => (
            <Item key={t.id} view={t.id} icon={tabIcons[t.i]} label={t.n} />
          ))}
        </nav>

        <nav class="sidebar-nav sidebar-nav--bottom">
          <Item view={STATISTICS_VIEW} icon={tabIcons[6]} label="Statistics" />
          <div
            class={`sidebar-status${connected.value ? " sidebar-status--on" : ""}`}
          >
            <span class="sidebar-status-dot" />
            <span>{connected.value ? "Connected" : "Disconnected"}</span>
          </div>
        </nav>
      </aside>
    </>
  );
}
