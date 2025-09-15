async function getHealth() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const r = await fetch(`${apiUrl}/health`, { cache: 'no-store' });
    return await r.json();
  } catch (e) {
    return { error: 'Falha ao conectar', detail: String(e) };
  }
}

export default async function Home() {
  const data = await getHealth();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">LinkMeTur Web</h1>
      <p className="mb-2">Backend → {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/health</p>
      <pre className="p-4 border rounded">{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}