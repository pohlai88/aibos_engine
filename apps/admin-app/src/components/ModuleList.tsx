import { useEffect, useState } from 'react';
import { fetchModules } from '../api/client';
import type { ModuleStatus } from '@aibos/types';
import CreateModuleForm from './CreateModuleForm';

export default function ModuleList() {
  const [modules, setModules] = useState<ModuleStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadModules = () => {
    setLoading(true);
    fetchModules()
      .then(setModules)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadModules();
  }, []);

  const handleCreated = () => {
    loadModules();
  };

  if (loading) {
    return (
      <div className="module-list">
        <h2>Modules</h2>
        <p>Loading modules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="module-list">
        <h2>Modules</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="module-list">
      <CreateModuleForm onCreated={handleCreated} />
      <h2>Modules ({modules.length})</h2>
      {modules.length === 0 ? (
        <p>No modules found.</p>
      ) : (
        <div className="module-grid">
          {modules.map((module) => (
            <div key={module.moduleId} className="module-card">
              <h3>{module.moduleId}</h3>
              <p><strong>Version:</strong> {module.version}</p>
              <p><strong>Status:</strong> 
                <span className={`status ${module.health}`}>
                  {module.health}
                </span>
              </p>
              <p><strong>Installed:</strong> {module.installed ? 'Yes' : 'No'}</p>
              <p><strong>Enabled:</strong> {module.enabled ? 'Yes' : 'No'}</p>
              {module.error && (
                <p><strong>Error:</strong> <span style={{ color: 'red' }}>{module.error}</span></p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 