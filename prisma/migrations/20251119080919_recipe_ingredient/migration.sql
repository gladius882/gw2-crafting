/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Discipline` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "output_item_count" INTEGER NOT NULL,
    "output_item_id" INTEGER NOT NULL,
    "time_to_craft" INTEGER NOT NULL DEFAULT 1000,
    "min_rating" INTEGER NOT NULL,
    "chat_link" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_name_key" ON "Discipline"("name");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_output_item_id_fkey" FOREIGN KEY ("output_item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
