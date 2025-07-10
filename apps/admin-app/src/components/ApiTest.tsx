import { useEffect, useState } from 'react';
import { fetchModules, fetchUsers } from '../api/client';

export default function ApiTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const [modules, users] = await Promise.all([
          fetchModules(),
          fetchUsers()
        ]);
        
        setStatus('success');
        setMessage(`✅ Connected! Found ${modules.length} modules and ${users.length} users`);
      } catch (error) {
        setStatus('error');
        setMessage(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="api-test" style={{
      background: status === 'success' ? '#d4edda' : status === 'error' ? '#f8d7da' : '#fff3cd',
      color: status === 'success' ? '#155724' : status === 'error' ? '#721c24' : '#856404',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center'
    }}>
      <h3>🔗 Backend Connection Test</h3>
      <p>{status === 'loading' ? 'Testing connection...' : message}</p>
    </div>
  );
} 