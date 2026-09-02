CREATE TABLE `phone_verification_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`phone_hash` text NOT NULL,
	`ip_hash` text NOT NULL,
	`code_hash` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`used_at` integer
);
--> statement-breakpoint
CREATE INDEX `idx_phone_codes_phone_created` ON `phone_verification_codes` (`phone_hash`,`created_at`);
--> statement-breakpoint
CREATE INDEX `idx_phone_codes_ip_created` ON `phone_verification_codes` (`ip_hash`,`created_at`);
--> statement-breakpoint
CREATE TABLE `auth_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`provider` text NOT NULL,
	`event_type` text NOT NULL,
	`ip_hash` text NOT NULL,
	`detail` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_auth_events_created` ON `auth_events` (`created_at`);
--> statement-breakpoint
CREATE TABLE `community_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`source_platform` text NOT NULL,
	`source_post_id` text NOT NULL,
	`source_url` text NOT NULL,
	`source_creator_name` text NOT NULL,
	`original_title` text NOT NULL,
	`summary` text NOT NULL,
	`key_lessons` text NOT NULL,
	`scenario` text NOT NULL,
	`content_type` text NOT NULL,
	`model_names` text,
	`source_score` real DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`visibility` text DEFAULT 'public' NOT NULL,
	`collected_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_community_posts_source` ON `community_posts` (`source_platform`,`source_post_id`);
--> statement-breakpoint
CREATE INDEX `idx_community_posts_scenario_score` ON `community_posts` (`scenario`,`source_score`);
