
// Polyfill global for stellar-sdk
if (typeof window !== 'undefined' && !window.global) {
  window.global = window;
}

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
