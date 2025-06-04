import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Url = {
    originalUrl: string;
    shortUrl: string;
    clicks: number;
}

export async function GET(
  request: Request,
  { params }: { params: { shortUrl: string } }
) {
  const { searchParams } = new URL(request.url);
  const checkOnly = searchParams.get("check") === "true";
  let isSuccess = false;
  let url: Url | null = null;

  try {
    const shortUrl = params.shortUrl;

    url = await prisma.url.update({
      where: {
        shortUrl,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    isSuccess = true;
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  if (isSuccess) {
    if (checkOnly) {
        return NextResponse.json({ valid: true }, { status: 200 });
    } else {
        return NextResponse.redirect(url!.originalUrl, { status: 301 });
    }
  }
}
