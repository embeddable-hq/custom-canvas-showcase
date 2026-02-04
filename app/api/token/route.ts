import { NextResponse } from "next/server";
import { envConfig, TOKEN_EXPIRY_SECONDS } from "@/utils/constants";

// Server-side API route to get security token
// This keeps the API key secure and never exposes it to the client
export async function POST(request: Request) {
  const { customCanvasState, userEmail, customCanvasReadOnly } =
    await request.json();
  if (!customCanvasState || !userEmail) {
    return NextResponse.json(
      { error: "customCanvasState and userEmail are required" },
      { status: 400 }
    );
  }

  if (!process.env.EMBEDDABLE_API_KEY) {
    return NextResponse.json(
      { error: "EMBEDDABLE_API_KEY is not set" },
      { status: 500 }
    );
  }

  if (!envConfig.embeddableApiUrl) {
    return NextResponse.json(
      { error: "EMBEDDABLE_API_URL is not set" },
      { status: 500 }
    );
  }

  if (!envConfig.EMBEDDABLE_ID) {
    return NextResponse.json(
      { error: "EMBEDDABLE_ID is not set" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${envConfig.embeddableApiUrl}/api/v1/security-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.EMBEDDABLE_API_KEY}`,
        },
        body: JSON.stringify({
          embeddableId: envConfig.EMBEDDABLE_ID,
          customCanvasState: customCanvasState,
          customCanvasReadOnly: customCanvasReadOnly ?? false,
          expiryInSeconds: TOKEN_EXPIRY_SECONDS,
          securityContext: {},
          user: "syed@embeddable.de",
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to get token:", {
        embeddableId: envConfig.EMBEDDABLE_ID,
        customCanvasState: customCanvasState,
        customCanvasReadOnly: customCanvasReadOnly ?? false,
        expiryInSeconds: TOKEN_EXPIRY_SECONDS,
        securityContext: {},
        user: "syed@embeddable.de",
      });
      console.error("Failed to get token:", response.statusText);
      return NextResponse.json(
        { error: `Failed to get token: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting token:", error);
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}
