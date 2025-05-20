'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Article = {
  id: number;
  name: string;
  photo_url: string;
  created_at: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Fetch articles from internal API
  const fetchArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?page=${page}`);
      const json = await res.json();
      const newArticles = json.data || [];

      setArticles((prev) => [...prev, ...newArticles]);
      setHasMore(newArticles.length > 0);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Load initial articles
  useEffect(() => {
    fetchArticles();
  });

  // Set up IntersectionObserver
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore && !loading) {
  //         fetchArticles();
  //       }
  //     },
  //     {
  //       threshold: 1.0,
  //     }
  //   );

  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }

  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [fetchArticles, hasMore, loading]);

  useEffect(() => {
  const target = loaderRef.current; // cache ref value

  if (!target) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchArticles();
      }
    },
    {
      threshold: 1.0,
    }
  );

  observer.observe(target);

  return () => {
    if (target) {
      observer.unobserve(target); // use cached ref value here
    }
  };
}, [fetchArticles, hasMore, loading]);


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Latest Articles</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
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

      <div ref={loaderRef} className="mt-10 text-center">
        {loading && <p className="text-gray-400">Loading more articles...</p>}
        {!hasMore && <p className="text-gray-500">You&apos;ve reached the end of our articles.</p>}
      </div>
    </div>
  );
}
