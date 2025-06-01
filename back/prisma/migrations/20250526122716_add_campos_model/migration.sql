/*
  Warnings:

  - You are about to drop the column `precoUnitario` on the `Revenda` table. All the data in the column will be lost.
  - Added the required column `eventoLocal` to the `Revenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroTelefone` to the `Revenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoOriginal` to the `Revenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoRevenda` to the `Revenda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revenda" DROP COLUMN "precoUnitario",
ADD COLUMN     "eventoLocal" TEXT NOT NULL,
ADD COLUMN     "numeroTelefone" TEXT NOT NULL,
ADD COLUMN     "precoOriginal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precoRevenda" DOUBLE PRECISION NOT NULL;
