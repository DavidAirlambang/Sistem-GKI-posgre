/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Limiter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Limiter" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Limiter_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Limiter_id_key" ON "Limiter"("id");
