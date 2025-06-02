"use server";

// deduct 1 credit
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

export const generate = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Fetch the user from the Convex database
  const convexUser = await convex.query(api.users.getUser, { userId: user.id });

  if (!convexUser) {
    throw new Error("User not found in Convex database");
  }

  if (convexUser.credits <= 0) {
    throw new Error("Insufficient credits");
  }

  // Deduct 1 credit
  await convex.mutation(api.users.deductCredits, { userId: user.id, amount: 1 });

};

export const refresh = async () => {
  revalidatePath("/text-in-between");
};
