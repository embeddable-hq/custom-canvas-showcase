import { useState, useEffect, useRef } from 'react';

const useGetToken = (customCanvasState: string, userEmail: string, customCanvasReadOnly?: boolean) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    
    async function fetchToken() {
      setLoading(true);
      setError(null);
      try {
        if (!customCanvasState || !userEmail) {
          setToken(null);
          setError(null);
          setLoading(false);
          return;
        }

        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ customCanvasState, userEmail, customCanvasReadOnly }),
          signal: abortController.signal,
        });
        
        if (!response.ok) {
          throw new Error(`Failed to get token: ${response.statusText}`);
        }

        const data = await response.json();
        const tokenValue = data.token || data.data?.token || data;
        setToken(tokenValue);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Failed to get token');
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchToken();

    // Cleanup function to abort request if component unmounts or dependencies change
    return () => {
      abortController.abort();
    };
  }, [customCanvasState, userEmail, customCanvasReadOnly]);

  return [token, error, loading] as const;
};

export default useGetToken;

