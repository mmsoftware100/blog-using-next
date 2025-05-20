// app/articles/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
// import '../../globals.css'; // Adjust as needed

type Article = {
  id: number;
  name: string;
  photo_url: string;
  created_at: string;
};

type Props = {
  searchParams: {
    page?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const page = parseInt(searchParams.page || '1', 10);
  const res = await fetch(`https://drtoken.live/api/v1/articles?page=${page}`, {
    cache: 'no-store', // ensures SSR behavior like getServerSideProps
  });

  if (!res.ok) return notFound();

  const json = await res.json();
  const articles: Article[] = json.data || [];
  const hasMore = articles.length > 0;
  const nextPage = page + 1;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Latest Articles</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(({ id, name, photo_url, created_at }) => (
          <Link key={id} href={`/articles/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={photo_url}
                  alt={name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
                <p className="text-gray-500 text-sm">Published: {created_at}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <Link
            href={`/articles?page=${nextPage}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Load More Articles
          </Link>
        </div>
      )}

      {!hasMore && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">You&apos;ve reached the end of our articles.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
}
