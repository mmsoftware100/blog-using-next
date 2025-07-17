'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

type Article = {
  ID: number;
  post_title: string;
  post_name: string;
  permalink: string;
  image: string;
  image_thumbnail: string;
  post_date: string;
  modified_time: string;
  excerpt: string;
  category: {
    name: string;
    permalink: string;
  };
  reviewed: {
    expert?: {
      display_name: string;
      profile_url: string;
    };
  };
};

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // const res = await fetch(`https://wp.hellosayarwon.com/wp-json/api/articles?page=${page}`);
      const res = await fetch(`/api/blog?page=${page}`);
      const json = await res.json();
      const newArticles = json.data?.posts || [];

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

  useEffect(() => {
  fetchArticles();
}, []); // 👈 run only once on component mount

  useEffect(() => {

    const loader = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchArticles();
        }
      },
      { threshold: 1.0 }
    );

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [fetchArticles, hasMore, loading]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Health Articles</h1>
            <p className="text-lg text-gray-600">Latest medical and parenting advice from experts</p>
          </div>
          <Link 
            href="/"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.ID} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <Link key={article.permalink} href={`/blog${article.permalink}`} className="block">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image || article.image_thumbnail || '/placeholder.jpg'}
                    alt={article.post_title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded">
                    {article.category?.name}
                  </span>
                </div>
              </Link>

              <div className="p-6 flex-grow flex flex-col">
                <Link href={`/blog${article.permalink}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
                    {article.post_title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      {formatDate(article.post_date)}
                    </span>
                    {article.reviewed.expert && (
                      <Link 
                        href={article.reviewed.expert.profile_url} 
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Dr. {article.reviewed.expert.display_name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={loaderRef} className="mt-12 py-8 text-center">
          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          {!hasMore && (
            <p className="text-gray-500">You&apos;ve reached the end of articles</p>
          )}
        </div>
      </div>
    </div>
  );
}