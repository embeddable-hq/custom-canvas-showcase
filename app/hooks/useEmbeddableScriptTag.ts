import { useState, useEffect } from 'react';
import { embeddableScriptUrl } from '@/utils/constants';

const useEmbeddableScriptTag = () => {
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof document === 'undefined') return false;
    return !!document.querySelector(`script[src="${embeddableScriptUrl}"]`);
  });
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (isLoaded) return;

    const script = document.createElement('script');
    script.src = embeddableScriptUrl!;
    script.async = true;
    script.type = 'module';
    
    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError('Failed to load embeddable script tag!');

    document.head.appendChild(script);
  }, [isLoaded]);

  return [isLoaded, error] as const;
};

export default useEmbeddableScriptTag;

