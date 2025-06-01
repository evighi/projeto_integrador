/*
  Warnings:

  - You are about to drop the column `eventoId` on the `Revenda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Revenda" DROP CONSTRAINT "Revenda_eventoId_fkey";

-- AlterTable
ALTER TABLE "Revenda" DROP COLUMN "eventoId";
