"use client";

import useGetToken from "../hooks/useGetToken";
import useEmbeddableScriptTag from "../hooks/useEmbeddableScriptTag";
import { envConfig } from "@/utils/constants";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "../lib/utils";

interface EmbeddableProps {
  customCanvasState: string;
  userEmail: string;
  customCanvasReadOnly?: boolean;
  theme?: string;
}

export default function Embeddable({
  customCanvasState,
  userEmail,
  customCanvasReadOnly,
  theme,
}: EmbeddableProps) {
  const [isScriptLoaded, scriptError] = useEmbeddableScriptTag();
  const [loadedKey, setLoadedKey] = useState<string>("");
  const [token, tokenError, tokenLoading] = useGetToken(
    customCanvasState,
    userEmail,
    customCanvasReadOnly
  );
  const ref = useRef<HTMLElement>(null);

  // Create a unique key based on token and theme to force recreation
  const embeddableKey = useMemo(
    () => `${token}-${theme || "default"}`,
    [token, theme]
  );

  // Derive loading state from whether current key matches loaded key
  const isComponentsLoaded = loadedKey === embeddableKey;

  const handleComponentsLoad = useCallback(() => {
    setLoadedKey(embeddableKey);
  }, [embeddableKey]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("componentsLoad", handleComponentsLoad);

      return () => {
        element.removeEventListener("componentsLoad", handleComponentsLoad);
      };
    }
  }, [handleComponentsLoad]);

  if (!token) {
    return null;
  }

  if (tokenError || scriptError) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-red-500">
          Error: {tokenError || scriptError}
        </div>
      </div>
    );
  }

  const clientContext = theme ? { theme } : {};

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Loading overlay - shown when components are not loaded */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white z-10",
          isComponentsLoaded || !tokenLoading || isScriptLoaded
            ? "hidden"
            : "flex"
        )}
      >
        <IconLoader2 size={24} className="animate-spin" />
        <div className="text-gray-500">Loading your dashboard</div>
      </div>

      {/* Embeddable - always in DOM, visible when components are loaded */}
      <div
        key={embeddableKey}
        className={cn(
          "w-full h-full",
          isComponentsLoaded || !tokenLoading || isScriptLoaded
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
