// packages/db/schema.ts
import { pgTable, uuid, text, timestamp, jsonb, varchar, boolean, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().unique(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const authEvents = pgTable("auth_events", {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: text("event_id").notNull().unique(),     // from WorkOS
    eventType: text("event_type").notNull(),          // authentication.oauth_succeeded
    type: text("type").notNull(),                     // oauth / sso / magic_link
    status: text("status").notNull(),                 // succeeded / failed
    userId: text("user_id").notNull(),                // WorkOS user id
    email: text("email").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    occurredAt: timestamp("occurred_at"),             // event.createdAt
    webhook: jsonb("webhook"),                                // whole payload (optional)
    createdAt: timestamp("created_at").defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  keyHash: varchar("key_hash", { length: 128 }).notNull(), // sha256
  label: varchar("label", { length: 100 }).notNull().default("default"),
  active: boolean("active").notNull().default(true),
  lastFour: varchar("last_four", { length: 4 }).notNull(), // display only
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  modelVersionId: varchar("model_version_id", { length: 120 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("queued"),
  input: jsonb("input").$type<Record<string, unknown>>().notNull(),
  result: jsonb("result").$type<Record<string, unknown> | null>(),
  error: text("error"),
  queuedAt: timestamp("queued_at").notNull().defaultNow(),
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  gpuSeconds: integer("gpu_seconds").notNull().default(0),
});