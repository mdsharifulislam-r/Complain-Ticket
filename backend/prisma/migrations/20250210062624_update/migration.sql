/*
  Warnings:

  - Added the required column `admin_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `admin_id` INTEGER NOT NULL,
    ADD COLUMN `ticket_id` INTEGER NOT NULL;
