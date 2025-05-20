import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Articles({ articles, page, hasMore }) {
  const nextPage = page + 1;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Articles</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map(({ id, name, photo_url, created_at }) => (
          <li key={id} style={{ marginBottom: '20px' }}>
            <Link href={`/articles/${id}`}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image
                  src={photo_url}
                  alt={name}
                  width={100}
                  height={60}
                  style={{ borderRadius: '8px', marginRight: '15px' }}
                />
                <div>
                  <h3>{name}</h3>
                  <small>Created: {created_at}</small>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <form method="get" action="/articles" style={{ marginTop: 20 }}>
          <input type="hidden" name="page" value={nextPage} />
          <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>
            Load More
          </button>
        </form>
      )}

      {!hasMore && <p>No more articles to load.</p>}

      <Link href="/" style={{ display: "inline-block", marginTop: 30, color: "blue" }}>
        ← Back to Home
      </Link>
    </div>
  );
}

// Server-side fetching with query param for pagination
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1;

  const res = await fetch(`https://drtoken.live/api/v1/articles?page=${page}`);
  const json = await res.json();
  const articles = json.data || [];

  const hasMore = articles.length > 0; // or use metadata from API if available

  return {
    props: {
      articles,
      page,
      hasMore,
    },
  };
}
