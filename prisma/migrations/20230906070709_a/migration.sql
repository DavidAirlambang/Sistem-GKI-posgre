/*
  Warnings:

  - You are about to drop the column `fasilitasRuangan` on the `Ruangan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ruangan" DROP COLUMN "fasilitasRuangan",
ADD COLUMN     "keteranganProjector" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "keteranganSoundSystem" TEXT NOT NULL DEFAULT '-';
