import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupApiFallback } from './services/setupApiFallback.js';

// Activate Vercel / offline fallback for API requests
setupApiFallback();

createRoot(document.getElementById('root')!).render(<App />);
