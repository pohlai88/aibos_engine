import { useState } from 'react';
import { createModule } from '../api/client';
import type { ModuleStatus } from '@aibos/types';

interface Props {
  onCreated: (module: ModuleStatus) => void;
}

export default function CreateModuleForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const newModule = await createModule({
        moduleId: name.toLowerCase().replace(/\s+/g, '-'),
        version,
        installed: true,
        enabled: true,
        health: 'healthy',
        installedAt: new Date(),
        updatedAt: new Date()
      });
      setSuccess(true);
      setName('');
      setVersion('1.0.0');
      onCreated(newModule);
    } catch (err: any) {
      setError(err.message || 'Failed to create module');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="create-module-form" onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
      <h3>Add New Module</h3>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Module name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          minLength={2}
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Version"
          value={version}
          onChange={e => setVersion(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc', width: 100 }}
        />
        <button type="submit" disabled={loading || !name.trim()} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      {error && <p style={{ color: 'red', margin: '0.5rem 0 0 0' }}>{error}</p>}
      {success && <p style={{ color: 'green', margin: '0.5rem 0 0 0' }}>Module created!</p>}
    </form>
  );
} 