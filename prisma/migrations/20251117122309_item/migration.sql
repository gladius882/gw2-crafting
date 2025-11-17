/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Rarity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "vendor_value" INTEGER NOT NULL DEFAULT 0,
    "chat_link" TEXT,
    "icon" TEXT,
    "rarity_id" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rarity_name_key" ON "Rarity"("name");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "Rarity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
