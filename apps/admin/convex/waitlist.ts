import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const waitlistTotal = query({
    handler: async (ctx) => {
        return (await ctx.db.query("waitlist").collect()).length
    }
})

export const addToWaitlist = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {

        const isExisted = await ctx.db.query("waitlist")
            .filter((q) =>
                q.eq(q.field("email"), args.email)
            ).collect()

        if (isExisted?.length > 0) {
            return
        }


        return await ctx.db.insert("waitlist", {
            email: args.email
        })
    }
})