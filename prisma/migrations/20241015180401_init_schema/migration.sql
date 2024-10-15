/*
  Warnings:

  - You are about to drop the column `piblished` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "piblished",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
