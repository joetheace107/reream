import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { SidebarItems } from "./sidebar-items";

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-64 border-r bg-muted/40 max-md:hidden">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <OrganizationSwitcher />
        </div>
        <div className="flex-1">
          <SidebarItems />
        </div>
        <div className="flex h-14 items-center border-t px-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
