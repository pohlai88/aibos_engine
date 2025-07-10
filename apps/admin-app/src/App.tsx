import ModuleList from './components/ModuleList';
import UserList from './components/UserList';
import ApiTest from './components/ApiTest';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 AIBOS Admin Console</h1>
        <p>Type-safe backend integration prototype</p>
      </header>
      
      <main className="app-main">
        <ApiTest />
        <div className="dashboard">
          <ModuleList />
          <UserList />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Built with Vite + React + TypeScript | Connected to AIBOS Core Engine</p>
      </footer>
    </div>
  );
}

export default App;
