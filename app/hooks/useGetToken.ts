import { useState, useEffect } from 'react';

const useGetToken = (embeddableId: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      setLoading(true);
      setError(null);
      try {
        if (!embeddableId) {
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
          body: JSON.stringify({ embeddableId }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to get token: ${response.statusText}`);
        }

        const data = await response.json();
        const tokenValue = data.token || data.data?.token || data;
        setToken(tokenValue);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get token');
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [embeddableId]);

  return [token, error, loading] as const;
};

export default useGetToken;

