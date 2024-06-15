import { clerkClient } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import UserRow from "./user-row";

export const fetchCache = "force-no-store";

export default async function Admin() {
  const { data } = await clerkClient.users.getUserList();

  return (
    <main className="container">
      <h1 className="my-2 text-2xl font-bold">Admin</h1>
      <h2 className="my-2 text-xl">Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Admin enabled?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((u) => (
            <UserRow
              key={u.id}
              id={u.id}
              name={`${u.firstName} ${u.lastName}`}
              emailAddress={u.emailAddresses[0]?.emailAddress}
              metadata={u.publicMetadata}
            />
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
