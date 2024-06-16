"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Home, LineChart, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export function SidebarItems() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="grid items-start px-2 text-sm font-medium">
      <Link
        href="/admin/"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          !segment && "bg-muted text-primary",
        )}
      >
        <Home className="size-4" />
        Dashboard
      </Link>
      <Link
        href="/admin/repos"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          segment === "repos" && "bg-muted text-primary",
        )}
      >
        <GitHubLogoIcon className="size-4" />
        Repos
      </Link>
      <Link
        href="/admin/deps"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          segment === "deps" && "bg-muted text-primary",
        )}
      >
        <Package className="size-4" />
        Deps
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <ShoppingCart className="size-4" />
        Orders
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <LineChart className="size-4" />
        Analytics
      </Link>
    </nav>
  );
}
