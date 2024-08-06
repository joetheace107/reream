import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const reposTable = sqliteTable(
  "repos",
  {
    id: integer("id").primaryKey(),
    owner: text("owner").notNull(),
    name: text("name").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(cast(unixepoch() as int))`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {
      ownerRepoIdx: uniqueIndex("repos_owner_name_idx").on(
        table.owner,
        table.name,
      ),
    };
  },
);

export const reposRelations = relations(reposTable, ({ many }) => ({
  depsToRepos: many(depsToReposTable),
}));

export const depsTable = sqliteTable("deps", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const depsRelations = relations(depsTable, ({ many }) => ({
  depsToRepos: many(depsToReposTable),
}));

export const depsToReposTable = sqliteTable(
  "deps_to_repos",
  {
    depId: text("dep_id")
      .notNull()
      .references(() => depsTable.id),
    repoId: integer("repo_id")
      .notNull()
      .references(() => reposTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.depId, t.repoId] }),
  }),
);

export const depsToReposRelations = relations(depsToReposTable, ({ one }) => ({
  dep: one(depsTable, {
    fields: [depsToReposTable.depId],
    references: [depsTable.id],
  }),
  repo: one(reposTable, {
    fields: [depsToReposTable.repoId],
    references: [reposTable.id],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
