// GET /api/articles/[slug]
import { NextRequest, NextResponse } from 'next/server';


type Params = Promise<{ slugArray: string[] }>;


export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const { slugArray } = await params;
  const slug = slugArray.join('/');


  try {
    const res = await fetch(`https://wp.hellosayarwon.com/wp-json/api/articles/${slug}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch article' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error: ' + error }, { status: 500 });
  }
}
