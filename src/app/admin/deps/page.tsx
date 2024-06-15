import { count, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/db";
import { depsTable, depsToReposTable } from "~/db/schema";

export const fetchCache = "force-no-store";

export default async function DepsPage() {
  const deps = await db
    .select({
      id: depsToReposTable.depId,
      name: depsTable.name,
      numberOfRepos: count(),
    })
    .from(depsToReposTable)
    .innerJoin(depsTable, eq(depsToReposTable.depId, depsTable.id))
    .groupBy(depsToReposTable.depId)
    .orderBy(desc(count()))
    .limit(10);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Deps</h1>
      </div>
      <div>
        <ul>
          {deps.map(({ id, name, numberOfRepos }) => (
            <li key={id}>
              <Link href={`/admin/deps/${id}`}>
                {numberOfRepos} | {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
