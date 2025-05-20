// app/api/articles/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';

  try {
    const res = await fetch(`https://drtoken.live/api/v1/articles?page=${page}`, {
      headers: {
        // Add auth headers if needed
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' + error }, { status: 500 });
  }
}
