CREATE TABLE `templates` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`kind` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`summary` text NOT NULL,
	`model_name` text,
	`hardware_sku` text,
	`instructions` text,
	`input_schema_json` text,
	`evidence_level` text DEFAULT 'unverified' NOT NULL,
	`source_type` text DEFAULT 'official' NOT NULL,
	`status` text DEFAULT 'beta' NOT NULL,
	`visibility` text DEFAULT 'public' NOT NULL,
	`install_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_templates_slug` ON `templates` (`slug`);
--> statement-breakpoint
CREATE INDEX `idx_templates_kind_category` ON `templates` (`kind`,`category`);
--> statement-breakpoint
CREATE TABLE `template_installs` (
	`id` text PRIMARY KEY NOT NULL,
	`template_id` text NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'saved' NOT NULL,
	`installed_at` integer NOT NULL,
	FOREIGN KEY (`template_id`) REFERENCES `templates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_template_installs_unique` ON `template_installs` (`template_id`,`user_id`);
