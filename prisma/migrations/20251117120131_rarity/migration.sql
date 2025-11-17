-- CreateTable
CREATE TABLE "Rarity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "min_level" INTEGER,
    "max_level" INTEGER,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("id")
);
