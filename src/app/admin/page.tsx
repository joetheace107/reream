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
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
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
        </div>
      </div>
    </main>
  );
}
