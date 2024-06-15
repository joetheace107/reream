"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function setAdminStatus(userId: string, status: boolean) {
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      isAdmin: status,
    },
  });
}
