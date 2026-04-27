import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  let elementCount = 0;
  let dbError: string | null = null;

  try {
    elementCount = await prisma.element.count();
  } catch (e) {
    dbError = e instanceof Error ? e.message : "Unknown database error";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Neon + Netlify preview test
        </h1>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This page calls Prisma against <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">DATABASE_URL</code>. Use a PR preview to confirm the branched Neon database is wired correctly.
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Element rows</dt>
            <dd className="font-mono text-zinc-900 dark:text-zinc-100">{dbError ? "—" : elementCount}</dd>
          </div>
        </dl>
        {dbError ? (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {dbError}
          </p>
        ) : null}
      </main>
    </div>
  );
}
