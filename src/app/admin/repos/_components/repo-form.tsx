"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { createRepoAction } from "../actions";

export const RepoFormDialog = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await createRepoAction(undefined, formData);

      if (result.error) {
        toast.error(result.error);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>Add Repo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Repo</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            autoComplete="off"
            required
            name="url"
            placeholder="https://github.com/..."
          />
          <Button type="submit" disabled={isPending}>
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
