/*
  Warnings:

  - A unique constraint covering the columns `[linkCompra]` on the table `Evento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Evento_linkCompra_key" ON "Evento"("linkCompra");
