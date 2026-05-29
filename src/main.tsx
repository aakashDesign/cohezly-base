import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/tokens/primitives.css';
import './styles/tokens/semantic.css';
import './styles/tokens/components.css';
import './styles/tokens/scales.css';
import './styles/reset.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
