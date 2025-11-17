-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);
