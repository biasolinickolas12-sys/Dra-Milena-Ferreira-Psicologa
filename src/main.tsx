import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.tsx';
import './index.css';

const Fallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 p-6 text-center">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
      <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-4">Ops! Algo deu errado.</h2>
      <p className="text-slate-500 mb-6 font-medium">Tivemos um problema técnico, mas já estamos trabalhando nisso.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 w-full"
      >
        Tentar Novamente
      </button>
      {/* Detalhes para debugar (apenas útil no console, escondido do usuário) */}
      <span className="hidden">{error.message}</span>
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
