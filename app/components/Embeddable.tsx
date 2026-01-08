"use client";

import useGetToken from "../hooks/useGetToken";
import useEmbeddableScriptTag from "../hooks/useEmbeddableScriptTag";
import { envConfig } from "@/utils/constants";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { cn } from "../lib/utils";
import { embeddable } from "../lib/tokens";

interface EmbeddableProps {
  customCanvasState: string;
  userEmail: string;
  customCanvasReadOnly?: boolean;
  theme?: string;
}

/**
 * Pure function to create client context object from theme
 */
const createClientContext = (theme?: string): Record<string, string> => {
  return theme ? { theme } : {};
};

/**
 * Loading overlay component for embeddable dashboard
 * Displays a spinner and loading message
 */
const LoadingOverlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        embeddable.loadingOverlay,
        className
      )}
    >
      <div className="embeddable-spinner" />
      <div>Loading your dashboard</div>
    </div>
  );
};

export default function Embeddable({
  customCanvasState,
  userEmail,
  customCanvasReadOnly,
  theme,
}: EmbeddableProps) {
  const [isScriptLoaded, scriptError] = useEmbeddableScriptTag();
  const [loadedEmbiddableKey, setLoadedEmbiddableKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [token, tokenError, tokenLoading] = useGetToken(
    customCanvasState,
    userEmail,
    customCanvasReadOnly
  );
  const ref = useRef<HTMLElement>(null);

  // Create a unique key based on token to force recreation
  const embeddableInstanceKey = useMemo(() => `${token}`, [token]);

  // Derive loading state from whether current key matches loaded key
  const areComponentsLoaded = loadedEmbiddableKey === embeddableInstanceKey;

  const handleComponentsLoad = useCallback(() => {
    setLoadedEmbiddableKey(embeddableInstanceKey);
    //  set a loading state to false
    setLoading(false);
  }, [embeddableInstanceKey]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("customCanvasReady", handleComponentsLoad);

      return () => {
        element.removeEventListener("customCanvasReady", handleComponentsLoad);
      };
    }
  }, [handleComponentsLoad]);
  
  if (!token || loading) {
    return (
      <div className="relative">
        <LoadingOverlay className="flex" />
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

  const clientContext = createClientContext(theme);

  return (
    <div className="relative w-full h-full min-h-[400px] py-4">
      {/* Loading overlay - shown when components are not loaded */}
      <LoadingOverlay
        className={
          areComponentsLoaded || !tokenLoading || isScriptLoaded
            ? "hidden"
            : "flex"
        }
      />

      {/* Embeddable - always in DOM, visible when components are loaded */}
      <div
        key={embeddableInstanceKey}
        className={cn(
          "w-full h-full",
          areComponentsLoaded || !tokenLoading || isScriptLoaded
            ? "block"
            : "hidden"
        )}
      >
        {React.createElement("em-beddable", {
          ref,
          token,
          "base-url": envConfig.embeddableBaseUrl || "",
          "client-context": JSON.stringify(clientContext),
        })}
      </div>
    </div>
  );
}
