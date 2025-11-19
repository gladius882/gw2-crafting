-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "gw2_id" INTEGER NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "world" INTEGER,
    "fractal_level" INTEGER,
    "daily_ap" INTEGER NOT NULL DEFAULT 0,
    "monthly_ap" INTEGER NOT NULL DEFAULT 0,
    "wvw_rank" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_gw2_id_key" ON "Account"("gw2_id");
