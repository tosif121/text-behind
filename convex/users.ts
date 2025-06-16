import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        credits: 0,
      });
    }
  },
});

export const getUser = query({
  args: { userId: v.string() },

  handler: async (ctx, args) => {
    if (!args.userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) return null;

    return user;
  },
});


//deduct credits from user
export const deductCredits = mutation(async ({ db }, { userId, amount }: { userId: string; amount: number }) => {
  const user = await db.query("users").filter((q) => q.eq(q.field("userId"), userId)).first();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.credits < amount) {
    throw new Error("Insufficient credits");
  }

  // Deduct the credits
  await db.patch(user._id, { credits: user.credits - amount });
});


export const addCreditsIfPaid = mutation({
  args: {
    email: v.string(),
    CustomerId: v.string(),
    OrderId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      credits: user.credits + 1000, 
      CustomerId: args.CustomerId,
      OrderId: args.OrderId,
    });

    return { success: true };
  },
});