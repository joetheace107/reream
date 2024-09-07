import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/db";

export default async function RepoPage({
  params,
}: {
  params: { repoId: string };
}) {
  const repo = await db.query.reposTable.findFirst({
    where: (repos, { eq }) => eq(repos.id, Number(params.repoId)),
  });
  if (!repo) {
    return notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">
          <Link
            href={`https://github.com/${repo.owner}/${repo.name}`}
            target="_blank"
          >
            {repo.owner}/{repo.name}
          </Link>
        </h1>
      </div>
    </main>
  );
}
