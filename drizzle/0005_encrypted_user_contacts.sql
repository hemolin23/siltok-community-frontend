CREATE TABLE `user_contacts` (
	`user_id` text PRIMARY KEY NOT NULL,
	`phone_ciphertext` text NOT NULL,
	`wechat_id_ciphertext` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
