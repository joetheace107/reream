"use server";

import slugify from "@sindresorhus/slugify";
import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { depsTable, depsToReposTable, reposTable } from "~/db/schema";
import { octokit } from "~/lib/octokit";

export async function createRepoAction(prevState: unknown, formData: FormData) {
  const githubUrl = formData.get("url") as string;
  const githubPath = githubUrl.split("github.com/")[1];
  if (!githubPath) {
    return {
      error: "Invalid URL",
    };
  }
  const [owner, repo] = githubPath.split("/");
  if (!owner || !repo) {
    return {
      error: "Invalid URL",
    };
  }
  const {
    data: { id: repoId },
  } = await octokit.rest.repos.get({ owner, repo });

  const existingRepo = await db.query.reposTable.findFirst({
    where: (repos, { eq }) => eq(repos.id, repoId),
  });
  if (existingRepo) {
    return {
      error: "Repo already exists",
    };
  }

  const response = await octokit.rest.search.code({
    q: `repo:${owner}/${repo} filename:package.json`,
  });

  const deps = [
    ...new Set(
      (
        await Promise.all(
          response.data.items.map(async ({ path }) => {
            const { data } = await octokit.rest.repos.getContent({
              owner,
              repo,
              path,
            });
            if ("type" in data && data.type === "file" && "content" in data) {
              if (data.encoding === "base64" && data.content) {
                const { dependencies, devDependencies } = JSON.parse(
                  Buffer.from(data.content, "base64").toString("utf-8"),
                ) as {
                  dependencies?: Record<string, string>;
                  devDependencies?: Record<string, string>;
                };
                return [
                  ...Object.keys(dependencies ? dependencies : {}),
                  ...Object.keys(devDependencies ? devDependencies : {}),
                ];
              }
            }
            return [];
          }),
        )
      ).flat(),
    ),
  ].map((name) => ({
    id: slugify(name),
    name,
  }));

  await db.transaction(async (tx) => {
    await tx.insert(reposTable).values({
      id: repoId,
      owner,
      name: repo,
    });
    await tx.insert(depsTable).values(deps).onConflictDoNothing();
    await tx
      .insert(depsToReposTable)
      .values(deps.map(({ id: depId }) => ({ depId, repoId })));
  });

  revalidatePath("/");

  return {
    success: true,
  };
}
