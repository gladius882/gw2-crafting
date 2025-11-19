/*
  Warnings:

  - You are about to drop the `Material` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Material";

-- CreateTable
CREATE TABLE "BankMaterial" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BankMaterial_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BankMaterial" ADD CONSTRAINT "BankMaterial_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
