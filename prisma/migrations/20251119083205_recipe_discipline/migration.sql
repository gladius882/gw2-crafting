/*
  Warnings:

  - The primary key for the `RecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RecipeIngredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gw2_id]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gw2_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "gw2_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipe_id", "item_id");

-- CreateTable
CREATE TABLE "RecipeDiscipline" (
    "recipe_id" INTEGER NOT NULL,
    "discipline_id" INTEGER NOT NULL,

    CONSTRAINT "RecipeDiscipline_pkey" PRIMARY KEY ("recipe_id","discipline_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_gw2_id_key" ON "Recipe"("gw2_id");

-- AddForeignKey
ALTER TABLE "RecipeDiscipline" ADD CONSTRAINT "RecipeDiscipline_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeDiscipline" ADD CONSTRAINT "RecipeDiscipline_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
