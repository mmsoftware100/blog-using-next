import { useRouter } from 'next/router';

export default function Article() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Article ID: {id}</h1>
      <p>This is a dynamic article page.</p>
    </div>
  );
}
