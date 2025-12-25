"use server";

import { revalidatePath } from "next/cache";

export const generate = async () => {
  // No authentication needed - anyone can generate
  return { success: true };
};

export const refresh = async () => {
  revalidatePath("/text-behind");
};
