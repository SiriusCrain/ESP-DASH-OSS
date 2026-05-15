import * as v from "valibot";
import { encode, decode } from "@msgpack/msgpack";
import { connected, widgets, statistics, tabs, FrameSchema } from "./state";

const url = `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/dashws`;
const socket = new WebSocket(url);
socket.binaryType = "arraybuffer";

socket.addEventListener("open", () => {
  connected.value = true;
  socket.send(encode({ command: "get:layout" }));
});

socket.addEventListener("close", () => {
  connected.value = false;
});

socket.addEventListener("message", (ev) => {
  if (!(ev.data instanceof ArrayBuffer)) return;
  const f = v.parse(FrameSchema, decode(new Uint8Array(ev.data)));

  if (f.command === "update:layout:begin") {
    widgets.value = {};
    statistics.value = {};
    const next: typeof tabs.value = {};
    for (const t of f.tabs ?? []) next[t.id] = t;
    tabs.value = next;
    return;
  }

  for (const u of f.widgets ?? [])
    widgets.value[u.id] = { ...widgets.value[u.id], ...u };
  for (const u of f.statistics ?? [])
    statistics.value[u.id] = { ...statistics.value[u.id], ...u };
  widgets.value = { ...widgets.value };
  statistics.value = { ...statistics.value };
});

setInterval(() => {
  if (socket.readyState === WebSocket.OPEN)
    socket.send(encode({ command: "ping" }));
}, 25_000);

export function sendEvent(id: number, value?: boolean | number | string) {
  if (socket.readyState !== WebSocket.OPEN) return;
  const msg: Record<string, unknown> = { id };
  if (value !== undefined) msg.value = value;
  socket.send(encode(msg));
}
