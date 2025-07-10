import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Store from './pages/Store';
import Settings from './pages/Settings';
import { mockNotifications } from './utils/mockData';

function App() {
  return (
    <WorkspaceProvider>
      <Router>
        <Layout notifications={mockNotifications}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </WorkspaceProvider>
  );
}

export default App; 