import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check if URL already exists
    const existingUrl = await prisma.url.findFirst({
      where: {
        originalUrl: url,
      },
    });

    if (existingUrl) {
      return NextResponse.json({
        shortUrl: `http://localhost:3000/${existingUrl.shortUrl}`,
        originalUrl: existingUrl.originalUrl,
        message: "URL was already shortened before",
      });
    }

    // Generate short URL if URL is new
    const shortUrl = nanoid(8);

    const savedUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl,
      },
    });

    return NextResponse.json({
      shortUrl: `http://localhost:3000/${shortUrl}`,
      originalUrl: savedUrl.originalUrl,
    });
  } catch (error) {
    console.error("Error processing URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 