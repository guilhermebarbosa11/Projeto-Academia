import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface ApiConfig<T, P = void> {
  fetchFn: (params?: P) => Promise<T>;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  initialData?: T;
  loadOnMount?: boolean;
}

export const useApi = <T, P = void>({
  fetchFn,
  dependencies = [],
  onSuccess,
  onError,
  initialData,
  loadOnMount = true,
}: ApiConfig<T, P>) => {
  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(loadOnMount);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(
    async (params?: P) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchFn(params);
        setData(result);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        
        setError(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        } else {
          toast.error("Erro", {
            description: errorMessage,
          });
        }
        
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchFn, onSuccess, onError]
  );
  
  useEffect(() => {
    if (loadOnMount) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  
  const refetch = useCallback((params?: P) => fetchData(params), [fetchData]);
  
  return { data, isLoading, error, refetch };
};
