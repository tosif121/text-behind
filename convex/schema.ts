import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(), // clerkId
    email: v.string(),
    name: v.string(),
    credits: v.number(),
    CustomerId: v.optional(v.string()),
    OrderId: v.optional(v.string()),
  }).index("by_user_id", ["userId"]),
});
