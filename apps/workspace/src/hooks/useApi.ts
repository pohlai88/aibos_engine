import { useState, useCallback, useEffect } from 'react';
import { ApiResponse } from '../services/api';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseApiOptions {
  immediate?: boolean;
  cache?: boolean;
  cacheKey?: string;
  retryCount?: number;
  retryDelay?: number;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
): UseApiState<T> & {
  execute: () => Promise<T | null>;
  reset: () => void;
} {
  const {
    immediate = false,
    cache = false,
    cacheKey,
    retryCount = 0,
    retryDelay = 1000,
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(async (): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    let lastError: string | null = null;
    
    for (let attempt = 0; attempt <= retryCount; attempt++) {
      try {
        const response = await apiCall();
        
        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
            success: true,
          });

          // Cache the result if caching is enabled
          if (cache && cacheKey) {
            localStorage.setItem(cacheKey, JSON.stringify({
              data: response.data,
              timestamp: Date.now(),
            }));
          }

          return response.data;
        } else {
          lastError = response.error || 'API request failed';
          throw new Error(lastError);
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error occurred';
        
        if (attempt === retryCount) {
          setState({
            data: null,
            loading: false,
            error: lastError,
            success: false,
          });
          return null;
        }
        
        // Wait before retrying
        if (retryDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    return null;
  }, [apiCall, cache, cacheKey, retryCount, retryDelay]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  // Load cached data on mount if caching is enabled
  useEffect(() => {
    if (cache && cacheKey) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const cacheAge = Date.now() - timestamp;
          const cacheExpiry = 5 * 60 * 1000; // 5 minutes
          
          if (cacheAge < cacheExpiry) {
            setState(prev => ({ ...prev, data, success: true }));
          } else {
            localStorage.removeItem(cacheKey);
          }
        } catch (error) {
          localStorage.removeItem(cacheKey);
        }
      }
    }
  }, [cache, cacheKey]);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for managing multiple API calls
export function useApiMultiple<T>(
  apiCalls: (() => Promise<ApiResponse<T>>)[],
  options: UseApiOptions = {}
): UseApiState<T[]> & {
  execute: () => Promise<T[]>;
  reset: () => void;
} {
  const [state, setState] = useState<UseApiState<T[]>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(async (): Promise<T[]> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const results = await Promise.all(apiCalls.map(call => call()));
      const successfulResults = results.filter(result => result.success);
      
      if (successfulResults.length === results.length) {
        const data = successfulResults.map(result => result.data);
        setState({
          data,
          loading: false,
          error: null,
          success: true,
        });
        return data;
      } else {
        const failedResults = results.filter(result => !result.success);
        const error = failedResults.map(result => result.error).join(', ');
        setState({
          data: null,
          loading: false,
          error,
          success: false,
        });
        return [];
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
        success: false,
      });
      return [];
    }
  }, [apiCalls]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate<T>(
  updateApiCall: (data: T) => Promise<ApiResponse<T>>,
  rollbackApiCall?: () => Promise<ApiResponse<T>>
) {
  const [optimisticData, setOptimisticData] = useState<T | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const update = useCallback(async (data: T): Promise<T | null> => {
    setIsUpdating(true);
    setOptimisticData(data);

    try {
      const response = await updateApiCall(data);
      
      if (response.success) {
        setOptimisticData(null);
        setIsUpdating(false);
        return response.data;
      } else {
        // Rollback on failure
        if (rollbackApiCall) {
          await rollbackApiCall();
        }
        setOptimisticData(null);
        setIsUpdating(false);
        throw new Error(response.error || 'Update failed');
      }
    } catch (error) {
      // Rollback on error
      if (rollbackApiCall) {
        try {
          await rollbackApiCall();
        } catch (rollbackError) {
          console.error('Rollback failed:', rollbackError);
        }
      }
      setOptimisticData(null);
      setIsUpdating(false);
      throw error;
    }
  }, [updateApiCall, rollbackApiCall]);

  return {
    optimisticData,
    isUpdating,
    update,
  };
} 