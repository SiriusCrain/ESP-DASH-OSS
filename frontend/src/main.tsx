import { render } from 'preact';
import { App } from './App';
import './styles.scss';
import './lib/ws';

render(<App />, document.getElementById('app')!);
