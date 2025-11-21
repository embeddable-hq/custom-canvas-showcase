"use client";

import useGetToken from "../hooks/useGetToken";
import useEmbeddableScriptTag from "../hooks/useEmbeddableScriptTag";
import { embeddableBaseUrl } from "@/utils/constants";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const [isComponentsLoaded, setIsComponentsLoaded] = useState(false);
  const [token, tokenError, tokenLoading] = useGetToken(
    customCanvasState || "",
    userEmail || "",
    customCanvasReadOnly
  );
  const ref = useRef<HTMLElement>(null);

  // COMMENTED OUT FOR NOW SINCE IT SHOULD BE FIXED FROM THE WEBCOMPONENTS REPO TO SUUPORT THE COMPONENTS CYCLE FOR CUSTOM CANVAS
  function handleComponentsLoad() {
    setIsComponentsLoaded(true);
  }


  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("componentsLoad", handleComponentsLoad);

      return () => {
        element.removeEventListener("componentsLoad", handleComponentsLoad);
      };
    }
  }, [token]);

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
        <Image
          src="/spinner.svg"
          alt="Loading"
          width={24}
          height={24}
          className="animate-spin"
        />
        <div className="text-gray-500">Loading your dashboard</div>
      </div>

      {/* Embeddable - always in DOM, visible when components are loaded */}
      <div
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
          "base-url": embeddableBaseUrl || "",
          "client-context": JSON.stringify(clientContext),
        })}
      </div>
    </div>
  );
}
