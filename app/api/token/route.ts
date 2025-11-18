import { NextResponse } from "next/server";
import { embeddableApiUrl, userEmail } from "@/utils/constants";

// Server-side API route to get security token
// This keeps the API key secure and never exposes it to the client
export async function POST(request: Request) {
  if (!process.env.EMBEDDABLE_API_KEY) {
    return NextResponse.json(
      { error: "EMBEDDABLE_API_KEY is not set" },
      { status: 500 }
    );
  }

  if (!embeddableApiUrl) {
    return NextResponse.json(
      { error: "EMBEDDABLE_API_URL is not set" },
      { status: 500 }
    );
  }

  try {
    const { embeddableId } = await request.json();

    if (!embeddableId) {
      return NextResponse.json(
        { error: "embeddableId is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${embeddableApiUrl}/api/v1/security-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EMBEDDABLE_API_KEY}`,
      },
      body: JSON.stringify({
        embeddableId: embeddableId,
        expiryInSeconds: 60 * 60 * 24 * 7,
        securityContext: {},
        user: userEmail,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to get token: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting token:", error);
    return NextResponse.json(
      { error: "Failed to get token" },
      { status: 500 }
    );
  }
}

