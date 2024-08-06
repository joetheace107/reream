"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/components/ui/input";
import { createUrl } from "~/lib/utils";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/admin/deps", newParams));
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        key={searchParams?.get("q")}
        type="search"
        name="search"
        placeholder="Search dependencies..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") ?? ""}
        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
      />
    </form>
  );
}
