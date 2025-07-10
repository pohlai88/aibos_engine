import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/client';
import type { User } from '@aibos/types';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="user-list">
        <h2>Users</h2>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list">
        <h2>Users</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h2>Users ({users.length})</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.displayName}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Username:</strong> {user.username || 'N/A'}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Status:</strong> 
                <span className={`status ${user.status}`}>
                  {user.status}
                </span>
              </p>
              <p><strong>Tenant:</strong> {user.tenantId}</p>
              <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 