import Link from 'next/link';
import Image from 'next/image';

export default function Articles({ articles }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Articles</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map(({ id, name, photo_url, created_at }) => (
          <li key={id} style={{ marginBottom: '20px' }}>
            <Link href={`/articles/${id}`}>
              {/* <a style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}> */}
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
              {/* </a> */}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        style={{ display: "inline-block", marginTop: 30, color: "blue" }}
      >
        ← Back to Home
      </Link>

    </div>
  );
}

// This runs on the server at request time, fetch data from API
export async function getServerSideProps() {
  const res = await fetch('https://drtoken.live/api/v1/articles');
  const json = await res.json();

  return {
    props: {
      articles: json.data || [],
    },
  };
}
