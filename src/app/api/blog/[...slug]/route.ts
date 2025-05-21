// GET /api/articles/1
import { NextRequest, NextResponse } from 'next/server';


type Params = Promise<{ slug: string[] }>;


export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const { slug } = await params;
  // console.log('slug', slug);

  const permLink = slug.join('/');

  try {
    const res = await fetch(`https://wp.hellosayarwon.com/wp-json/api/article/${permLink}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    // console.log('res', res.text());

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch article' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Server error: ' + error }, { status: 500 });
  }
}
