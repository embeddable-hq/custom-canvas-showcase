"use client";

import useGetToken from '../hooks/useGetToken';
import useEmbeddableScriptTag from '../hooks/useEmbeddableScriptTag';
import { embeddableBaseUrl } from '@/utils/constants';

interface EmbeddableRendererProps {
  embeddableId: string;
}

export default function EmbeddableRenderer({ embeddableId }: EmbeddableRendererProps) {
  const [isScriptLoaded, scriptError] = useEmbeddableScriptTag();
  const [token, tokenError, tokenLoading] = useGetToken(embeddableId);

  if (tokenLoading || !isScriptLoaded) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-gray-500">Loading embeddable...</div>
      </div>
    );
  }

  if (tokenError || scriptError) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-red-500">Error: {tokenError || scriptError}</div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <em-beddable base-url={embeddableBaseUrl || ""} token={token} />
    </div>
  );
}

