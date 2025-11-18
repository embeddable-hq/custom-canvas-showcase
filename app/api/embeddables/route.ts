import { NextResponse } from "next/server";
import { embeddableApiUrl } from "@/utils/constants";

// Server-side API route to fetch embeddables
// This keeps the API key secure and never exposes it to the client
export async function GET() {
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
    // Fetch all embeddables from the Embeddable API
    const embeddablesResponse = await fetch(
      `${embeddableApiUrl}/api/v1/embeddables`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.EMBEDDABLE_API_KEY}`,
        },
      }
    );

    if (!embeddablesResponse.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch embeddables: ${embeddablesResponse.statusText}`,
        },
        { status: embeddablesResponse.status }
      );
    }

    const data = await embeddablesResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching embeddables:", error);
    return NextResponse.json(
      { error: "Failed to fetch embeddables" },
      { status: 500 }
    );
  }
}
