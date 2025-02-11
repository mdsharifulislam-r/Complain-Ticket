/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `reply_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `reply_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`reply_id`);

-- AlterTable
ALTER TABLE `Ticket` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `ticket_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`ticket_id`);
