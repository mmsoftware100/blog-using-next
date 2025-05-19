import Image from "next/image";
import Link from "next/link";
import '../../src/app/globals.css';

export default function Article({ article }) {
  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <Link href="/articles" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Article Header */}
      <div className="mb-8">
        <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Articles
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{article.name}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          {article.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {article.category.name}
            </span>
          )}
          <span>Published: {article.created_at}</span>
          {article.updated_at && (
            <span>Updated: {article.created_at}</span>
          )}
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-64 sm:h-96">
        <Image
          src={article.photo_url}
          alt={article.name}
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {article.description}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/articles" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          View All Articles
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`https://drtoken.live/api/v1/articles/${id}`);
    if (!res.ok) {
      return { props: { article: null } };
    }

    const json = await res.json();

    if (!json.status || !json.data) {
      return { props: { article: null } };
    }

    return {
      props: {
        article: json.data,
      },
    };
  } catch (error) {
    return { props: { article: null } };
  }
}