import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Stores WorkOS authentication events (OAuth / Magic Link / SSO, etc.)
 */
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    // Event metadata
    type: text("type").notNull(),           // e.g. "oauth", "sso", "magic_link"
    status: text("status").notNull(),       // e.g. "succeeded", "failed"

    // User identity
    userId: text("user_id").notNull(),      // WorkOS user ID
    email: text("email").notNull(),

    // Request context
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),

    // Audit timestamps
    createdAt: timestamp("created_at").defaultNow(),
});
