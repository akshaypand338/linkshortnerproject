CREATE TABLE "shortened_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"url" text NOT NULL,
	"short_code" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "uq_short_code" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX "idx_clerk_user_id" ON "shortened_links" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "idx_short_code" ON "shortened_links" USING btree ("short_code");