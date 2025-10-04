CREATE TABLE "api_keys" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"key_hash" varchar(128) NOT NULL,
	"label" varchar(100) DEFAULT 'default' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"last_four" varchar(4) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"model_version_id" varchar(120) NOT NULL,
	"status" varchar(20) DEFAULT 'queued' NOT NULL,
	"input" jsonb NOT NULL,
	"result" jsonb,
	"error" text,
	"queued_at" timestamp DEFAULT now() NOT NULL,
	"started_at" timestamp,
	"finished_at" timestamp,
	"gpu_seconds" integer DEFAULT 0 NOT NULL
);
