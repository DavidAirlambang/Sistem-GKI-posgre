-- CreateTable
CREATE TABLE "Limiter" (
    "id" SERIAL NOT NULL,
    "awal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "akhir" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Limiter_pkey" PRIMARY KEY ("id")
);
