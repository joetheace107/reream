"use client";

import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import { TableCell, TableRow } from "~/components/ui/table";
import { setAdminStatus } from "./actions";

type Props = {
  id: string;
  name: string;
  emailAddress?: string;
  metadata?: UserPublicMetadata;
};

export default function UserRow({ id, name, emailAddress, metadata }: Props) {
  const [isChecked, setIsChecked] = useState(!!metadata?.isAdmin);

  async function onToggleAdminStatus() {
    try {
      await setAdminStatus(id, !isChecked);
      setIsChecked(!isChecked);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <TableRow>
      <TableCell className="flex flex-col">
        <span>{name}</span>
        <span className="text-xs italic text-muted-foreground">{id}</span>
      </TableCell>

      <TableCell>{emailAddress}</TableCell>

      <TableCell className="text-right">
        <Switch
          onCheckedChange={onToggleAdminStatus}
          checked={!!isChecked}
          aria-readonly
        />
      </TableCell>
    </TableRow>
  );
}
