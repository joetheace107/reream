import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/db";

export default async function DepPage({
  params,
}: {
  params: { depId: string };
}) {
  const dep = await db.query.depsTable.findFirst({
    where: (deps, { eq }) => eq(deps.id, params.depId),
    with: {
      depsToRepos: {
        with: {
          repo: true,
        },
      },
    },
  });
  if (!dep) {
    return notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">{dep.name}</h1>
      </div>
      <ul>
        {dep.depsToRepos.map(({ repo: { id, owner, name } }) => (
          <li key={id}>
            <Link href={`https://github.com/${owner}/${name}`} target="_blank">
              {owner}/{name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
