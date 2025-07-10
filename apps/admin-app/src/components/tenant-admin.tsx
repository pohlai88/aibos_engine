import React, { useState, useEffect } from 'react'
import { getTenantHierarchy, toggleChildAccess, TenantHierarchy, MinimalTenant } from '@aibos/core-sdk'

interface TenantAdminProps {
  parentTenantId: string
}

export function TenantAdmin({ parentTenantId }: TenantAdminProps) {
  const [hierarchy, setHierarchy] = useState<TenantHierarchy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHierarchy()
  }, [parentTenantId])

  const loadHierarchy = async () => {
    try {
      setLoading(true)
      const data = await getTenantHierarchy(parentTenantId)
      setHierarchy(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load hierarchy')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleChild = async (childId: string, enable: boolean) => {
    try {
      await toggleChildAccess(childId, enable)
      // Reload hierarchy to get updated data
      await loadHierarchy()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle access')
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">Error: {error}</div>
          <button 
            onClick={loadHierarchy}
            className="mt-2 text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!hierarchy) {
    return (
      <div className="p-6">
        <div className="text-gray-500">No hierarchy found</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Parent Section - Always Visible */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{hierarchy.parent.name}</h2>
            <p className="text-gray-600">Parent Organization</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        
        {/* Parent Empty States */}
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Empty States</h3>
          <EmptyStates tenantId={hierarchy.parent.id} />
        </div>
      </div>

      {/* Children as "Modules" */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Child Organizations</h3>
        
        {hierarchy.children.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-500">No child organizations yet</p>
            <button className="mt-2 text-blue-600 hover:text-blue-800 underline">
              Add Child Organization
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hierarchy.children.map((child) => (
              <ChildTenantCard
                key={child.id}
                child={child}
                onToggle={handleToggleChild}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ChildTenantCardProps {
  child: MinimalTenant
  onToggle: (childId: string, enable: boolean) => Promise<void>
}

function ChildTenantCard({ child, onToggle }: ChildTenantCardProps) {
  const [toggling, setToggling] = useState(false)

  const handleToggle = async () => {
    setToggling(true)
    try {
      await onToggle(child.id, !child.group_mode)
    } finally {
      setToggling(false)
    }
  }

  return (
    <div className={`bg-white border rounded-lg p-4 transition-all ${
      child.group_mode 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-medium text-gray-900">{child.name}</h4>
          <p className="text-sm text-gray-600">{child.slug}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            child.group_mode
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {child.group_mode ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {child.group_mode ? 'Sharing data with parent' : 'Operating independently'}
        </div>
        
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            child.group_mode
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          } disabled:opacity-50`}
        >
          {toggling ? '...' : child.group_mode ? 'Disable' : 'Enable'}
        </button>
      </div>

      {/* Show empty states if enabled */}
      {child.group_mode && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-900 mb-2">Empty States</h5>
          <EmptyStates tenantId={child.id} />
        </div>
      )}
    </div>
  )
}

interface EmptyStatesProps {
  tenantId: string
}

function EmptyStates({ tenantId }: EmptyStatesProps) {
  const [states, setStates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoading(true)
        // This would call the getEmptyStatesWithInheritance function
        // For now, just show a placeholder
        setStates([])
      } catch (err) {
        console.error('Failed to load empty states:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStates()
  }, [tenantId])

  if (loading) {
    return <div className="text-sm text-gray-500">Loading states...</div>
  }

  if (states.length === 0) {
    return <div className="text-sm text-gray-500">No empty states configured</div>
  }

  return (
    <div className="space-y-2">
      {states.map((state, index) => (
        <div key={index} className="text-sm text-gray-700">
          {state.name}
        </div>
      ))}
    </div>
  )
} 