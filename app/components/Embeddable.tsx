"use client";

import { useState } from "react";
import useGetToken from "../hooks/useGetToken";
import { envConfig } from "@/utils/constants";
import { cn } from "../lib/utils";
import { embeddable } from "../lib/tokens";
import { useEmbeddable } from "@embeddable.com/em-beddable-react";
import { EmbeddableComponent } from "@embeddable.com/em-beddable-react";

interface EmbeddableProps {
  customCanvasState: string;
  userEmail: string;
  customCanvasReadOnly?: boolean;
  theme?: string;
}

const createClientContext = (theme?: string): Record<string, string> => {
  return theme ? { theme } : {};
};

const LoadingOverlay = ({ className }: { className?: string }) => {
  return (
    <div className={cn(embeddable.loadingOverlay, className)}>
      <div className="embeddable-spinner" />
      <div>Loading your dashboard</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Variant 1: useEmbeddable hook (active)
// Gives full control over the container element and loading/error state.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inner component that mounts the dashboard for a given token.
 * Keyed by `token` in the parent so React remounts it on token change,
 * which naturally resets all state without calling setState inside an effect.
 */
// function EmbeddableDashboard({
//   token,
//   theme,
// }: {
//   token: string;
//   theme?: string;
// }) {
//   const { containerRef, loaded, canvasReady, error } = useEmbeddable({
//     scriptUrl: envConfig.embeddableScriptUrl,
//     region: "us",
//     token,
//     baseUrl: envConfig.embeddableBaseUrl || undefined,
//     clientContext: createClientContext(theme),
//   });
//
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-full min-h-[400px]">
//         <div className="text-red-500">Error: {error.errorMessage}</div>
//       </div>
//     );
//   }
//
//   const isLoading = !loaded || !canvasReady;
//
//   return (
//     <>
//       <LoadingOverlay className={isLoading ? "flex" : "hidden"} />
//       <div
//         ref={containerRef}
//         className={cn("w-full h-full", isLoading ? "hidden" : "block")}
//       />
//     </>
//   );
// }

// ─────────────────────────────────────────────────────────────────────────────
// Variant 2: EmbeddableComponent (commented out)
// Declarative approach — the component manages its own container element.
// You handle loading/error state via callbacks.
// ─────────────────────────────────────────────────────────────────────────────

function EmbeddableDashboard({
  token,
  theme,
}: {
  token: string;
  theme?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {loading && <LoadingOverlay className="flex" />}
      {error && (
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <div className="text-red-500">Error: {error}</div>
        </div>
      )}
      <EmbeddableComponent
        // @ts-expect-error — internal option: custom script URL for dev environment
        scriptUrl={envConfig.embeddableScriptUrl}
        region="us"
        token={token}
        baseUrl={envConfig.embeddableBaseUrl || undefined}
        clientContext={createClientContext(theme)}
        onCustomCanvasReady={() => setLoading(false)}
        onError={(err) => {
          setError(err.errorMessage);
          setLoading(false);
        }}
        className={cn("w-full h-full", loading ? "hidden" : "block")}
      />
    </>
  );
}

export default function Embeddable({
  customCanvasState,
  userEmail,
  customCanvasReadOnly,
  theme,
}: EmbeddableProps) {
  const [token, tokenError, tokenLoading] = useGetToken(
    customCanvasState,
    userEmail,
    customCanvasReadOnly
  );

  if (!token || tokenLoading) {
    return (
      <div className="relative">
        <LoadingOverlay className="flex" />
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-red-500">Error: {tokenError}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] py-4">
      <EmbeddableDashboard key={token} token={token} theme={theme} />
    </div>
  );
}
