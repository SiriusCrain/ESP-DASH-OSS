import * as v from 'valibot';
import { encode, decode } from '@msgpack/msgpack';
import { connected, widgets, statistics, FrameSchema } from './state';

const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/dashws`;
const socket = new WebSocket(url);
socket.binaryType = 'arraybuffer';

socket.addEventListener('open', () => {
  connected.value = true;
  socket.send(encode({ command: 'get:layout' }));
});

socket.addEventListener('close', () => {
  connected.value = false;
});

socket.addEventListener('message', (ev) => {
  if (!(ev.data instanceof ArrayBuffer)) return;
  const f = v.parse(FrameSchema, decode(new Uint8Array(ev.data)));
  if (f.command === 'update:layout:begin') {
    widgets.value = {};
    statistics.value = {};
    return;
  }
  if (f.command === 'pong') return;

  if (f.widgets?.length) {
    const next = { ...widgets.value };
    for (const w of f.widgets) next[w.id] = { ...next[w.id], ...w };
    widgets.value = next;
  }
  if (f.statistics?.length) {
    const next = { ...statistics.value };
    for (const s of f.statistics) next[s.id] = { ...next[s.id], ...s };
    statistics.value = next;
  }
});

setInterval(() => {
  if (socket.readyState === WebSocket.OPEN) socket.send(encode({ command: 'ping' }));
}, 25_000);
