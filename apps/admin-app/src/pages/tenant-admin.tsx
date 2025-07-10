import React from 'react'
import { TenantAdmin } from '../components/tenant-admin'

export default function TenantAdminPage() {
  // Use the parent tenant ID from our test
  const parentTenantId = '06db96c2-ec8a-40a2-a438-ec4f81e1508b'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Tenant Administration</h1>
          <p className="text-gray-600">Manage your organization hierarchy and child tenants</p>
        </div>
        
        <TenantAdmin parentTenantId={parentTenantId} />
      </div>
    </div>
  )
} 