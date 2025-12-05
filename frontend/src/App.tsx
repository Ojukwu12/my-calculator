import React from 'react';
import { Calculator } from './components/Calculator';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Production Calculator</h1>
        <p className="subtitle">A full-stack TypeScript calculator with AI-ready architecture</p>
      </header>
      <main className="app-main">
        <Calculator />
      </main>
      <footer className="app-footer">
        <p>Built with React, TypeScript, and Express</p>
      </footer>
    </div>
  );
};

export default App;
