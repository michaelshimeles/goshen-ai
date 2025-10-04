CREATE TABLE "auth_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" text NOT NULL,
	"event_type" text NOT NULL,
	"type" text NOT NULL,
	"status" text NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"occurred_at" timestamp,
	"webhook" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_events_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;