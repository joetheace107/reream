import Link from "next/link";
import { db } from "~/db";
import { RepoFormDialog } from "./_components/repo-form";

export const fetchCache = "force-no-store";

export default async function ReposPage() {
  const repos = await db.query.reposTable.findMany();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Repos</h1>
        <RepoFormDialog />
      </div>
      <div>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <Link href={`/admin/repos/${repo.id}`}>
                {repo.owner}/{repo.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
