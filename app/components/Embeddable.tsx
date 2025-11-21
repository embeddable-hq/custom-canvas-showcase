"use client";

import useGetToken from "../hooks/useGetToken";
import useEmbeddableScriptTag from "../hooks/useEmbeddableScriptTag";
import { embeddableBaseUrl } from "@/utils/constants";
import React, { useRef } from "react";

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
  const [token, tokenError, tokenLoading] = useGetToken(
    customCanvasState || "",
    userEmail || "",
    customCanvasReadOnly
  );
  const ref = useRef<HTMLElement>(null);

  // COMMENTED OUT FOR NOW SINCE IT SHOULD BE FIXED FROM THE WEBCOMPONENTS REPO TO SUUPORT THE COMPONENTS CYCLE FOR CUSTOM CANVAS
  // function handleComponentsLoad(e: Event) {
  //   // console.log('event from onComponentsLoad --------------------', e);
  // }

  // function handleEmbeddableError(e: Event) {
  //   const customEvent = e as CustomEvent;
  //   console.error('embeddable error', customEvent.detail);
  // }

  // useEffect(() => {
  //   const element = ref.current;
  //   if (element) {
  //     element.addEventListener('componentsLoad', handleComponentsLoad);
  //     element.addEventListener('embeddableError', handleEmbeddableError);

  //     return () => {
  //       element.removeEventListener('componentsLoad', handleComponentsLoad);
  //       element.removeEventListener('embeddableError', handleEmbeddableError);
  //     };
  //   }
  // }, [token]);

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

  const clientContext = theme ? { theme } : {};

  return (
    <div className="w-full h-full">
      {React.createElement("em-beddable", {
        ref,
        token,
        "base-url": embeddableBaseUrl || "",
        "client-context": JSON.stringify(clientContext),
      })}
    </div>
  );
}
