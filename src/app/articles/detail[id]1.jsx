import Image from "next/image";
import Link from "next/link";

export default function Article({ article }) {
  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
      <h1>{article.name}</h1>

      <Image
        src={article.photo_url}
        alt={article.name}
        width={600}
        height={360}
        style={{ borderRadius: "8px" }}
      />

      <p>
        <strong>Category:</strong> {article.category?.name}
      </p>

      <p>
        <strong>Created:</strong> {article.created_at}
      </p>
      <p>
        <strong>Updated:</strong> {article.updated_at}
      </p>

      <div style={{ whiteSpace: "pre-wrap", marginTop: 20 }}>
        {article.description}
      </div>

      <Link
        href="/articles"
        style={{ display: "inline-block", marginTop: 30, color: "blue" }}
      >
        ← Back to Articles
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

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
}
