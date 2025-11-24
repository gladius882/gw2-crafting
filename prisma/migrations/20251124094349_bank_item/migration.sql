-- CreateTable
CREATE TABLE "BankItem" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BankItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankItem_item_id_key" ON "BankItem"("item_id");

-- AddForeignKey
ALTER TABLE "BankItem" ADD CONSTRAINT "BankItem_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
