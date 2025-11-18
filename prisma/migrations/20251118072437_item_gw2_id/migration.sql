/*
  Warnings:

  - A unique constraint covering the columns `[gw2_id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gw2_id` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Item_name_key";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "gw2_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_gw2_id_key" ON "Item"("gw2_id");
