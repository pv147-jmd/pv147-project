CREATE TABLE `dayRuns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`count` integer,
	`date` text,
	`user_id` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nickname` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);