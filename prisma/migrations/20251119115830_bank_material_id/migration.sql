/*
  Warnings:

  - A unique constraint covering the columns `[item_id]` on the table `BankMaterial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BankMaterial_item_id_key" ON "BankMaterial"("item_id");
