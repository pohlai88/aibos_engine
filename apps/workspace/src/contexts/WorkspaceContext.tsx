import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApi } from '../hooks/useApi';
import { tenantsApi, Tenant } from '../services/tenants';
import { usersApi, UserProfile } from '../services/users';
import { modulesApi, InstalledModule } from '../services/modules';
import { mockUser, mockInstalledModules } from '../utils/mockData';

interface WorkspaceContextType {
  // Current tenant
  currentTenant: Tenant | null;
  tenantLoading: boolean;
  tenantError: string | null;
  
  // Current user
  currentUser: UserProfile | null;
  userLoading: boolean;
  userError: string | null;
  
  // Installed modules
  installedModules: InstalledModule[];
  modulesLoading: boolean;
  modulesError: string | null;
  
  // Actions
  refreshTenant: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshModules: () => Promise<void>;
  installModule: (moduleId: string) => Promise<void>;
  uninstallModule: (moduleId: string) => Promise<void>;
  toggleModule: (moduleId: string, enabled: boolean) => Promise<void>;
  
  // State
  isLoading: boolean;
  hasError: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
  tenantId?: string;
  userId?: string;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({
  children,
  tenantId = 'tenant-1', // Default for development
  userId = 'user-1', // Default for development
}) => {
  // Tenant state
  const {
    data: currentTenant,
    loading: tenantLoading,
    error: tenantError,
    execute: fetchTenant,
  } = useApi(() => tenantsApi.getCurrentTenant(), {
    immediate: false,
    cache: true,
    cacheKey: `tenant-${tenantId}`,
  });

  // User state
  const {
    data: currentUser,
    loading: userLoading,
    error: userError,
    execute: fetchUser,
  } = useApi(() => usersApi.getCurrentUser(), {
    immediate: false,
    cache: true,
    cacheKey: `user-${userId}`,
  });

  // Modules state
  const {
    data: installedModules,
    loading: modulesLoading,
    error: modulesError,
    execute: fetchModules,
  } = useApi(() => modulesApi.getInstalledModules(tenantId), {
    immediate: false,
    cache: true,
    cacheKey: `modules-${tenantId}`,
  });

  // Initialize with mock data for development
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // For development, use mock data initially
      // In production, this would call the real APIs
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Refresh functions
  const refreshTenant = async () => {
    await fetchTenant();
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const refreshModules = async () => {
    await fetchModules();
  };

  // Module actions
  const installModule = async (moduleId: string) => {
    try {
      await modulesApi.installModule({
        moduleId,
        tenantId,
      });
      await refreshModules();
    } catch (error) {
      console.error('Failed to install module:', error);
      throw error;
    }
  };

  const uninstallModule = async (moduleId: string) => {
    try {
      await modulesApi.uninstallModule(moduleId, tenantId);
      await refreshModules();
    } catch (error) {
      console.error('Failed to uninstall module:', error);
      throw error;
    }
  };

  const toggleModule = async (moduleId: string, enabled: boolean) => {
    try {
      await modulesApi.toggleModule(moduleId, tenantId, enabled);
      await refreshModules();
    } catch (error) {
      console.error('Failed to toggle module:', error);
      throw error;
    }
  };

  // Computed values
  const isLoading = tenantLoading || userLoading || modulesLoading;
  const hasError = !!(tenantError || userError || modulesError);

  // For development, use mock data
  const developmentData = {
    currentTenant: currentTenant || {
      id: tenantId,
      name: 'Acme Corporation',
      slug: 'acme-corp',
      groupMode: 'isolated' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active' as const,
      settings: {
        timezone: 'UTC',
        locale: 'en',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
      },
      limits: {
        maxUsers: 100,
        maxStorage: 1000000,
        maxModules: 50,
      },
      usage: {
        currentUsers: 5,
        currentStorage: 50000,
        currentModules: 3,
      },
    },
    currentUser: currentUser || mockUser as UserProfile,
    installedModules: installedModules || mockInstalledModules,
  };

  const value: WorkspaceContextType = {
    // Use real data if available, otherwise fall back to development data
    currentTenant: currentTenant || developmentData.currentTenant,
    tenantLoading,
    tenantError,
    
    currentUser: currentUser || developmentData.currentUser,
    userLoading,
    userError,
    
    installedModules: installedModules || developmentData.installedModules,
    modulesLoading,
    modulesError,
    
    refreshTenant,
    refreshUser,
    refreshModules,
    installModule,
    uninstallModule,
    toggleModule,
    
    isLoading,
    hasError,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

// Convenience hooks for specific parts of the workspace
export const useCurrentTenant = () => {
  const { currentTenant, tenantLoading, tenantError, refreshTenant } = useWorkspace();
  return { currentTenant, loading: tenantLoading, error: tenantError, refresh: refreshTenant };
};

export const useCurrentUser = () => {
  const { currentUser, userLoading, userError, refreshUser } = useWorkspace();
  return { currentUser, loading: userLoading, error: userError, refresh: refreshUser };
};

export const useInstalledModules = () => {
  const { 
    installedModules, 
    modulesLoading, 
    modulesError, 
    refreshModules,
    installModule,
    uninstallModule,
    toggleModule,
  } = useWorkspace();
  
  return { 
    installedModules, 
    loading: modulesLoading, 
    error: modulesError, 
    refresh: refreshModules,
    installModule,
    uninstallModule,
    toggleModule,
  };
}; 