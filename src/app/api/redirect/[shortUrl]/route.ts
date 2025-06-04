import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { shortUrl: string } }
) {
  try {
    const shortUrl = params.shortUrl;

    const url = await prisma.url.update({
      where: {
        shortUrl,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.redirect(url.originalUrl, { status: 301 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }
    console.error("Error processing redirect:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 