/*
  Warnings:

  - You are about to drop the column `id_user` on the `Viatikum` table. All the data in the column will be lost.
  - You are about to drop the column `nominal_total` on the `Viatikum` table. All the data in the column will be lost.
  - You are about to drop the column `nominal_viatikum` on the `Viatikum` table. All the data in the column will be lost.
  - You are about to drop the column `periode` on the `Viatikum` table. All the data in the column will be lost.
  - Added the required column `pertahun` to the `Viatikum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tahun` to the `Viatikum` table without a default value. This is not possible if the table is not empty.
  - Added the required column `viatikum` to the `Viatikum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Viatikum" DROP COLUMN "id_user",
DROP COLUMN "nominal_total",
DROP COLUMN "nominal_viatikum",
DROP COLUMN "periode",
ADD COLUMN     "pertahun" INTEGER NOT NULL,
ADD COLUMN     "tahun" INTEGER NOT NULL,
ADD COLUMN     "viatikum" INTEGER NOT NULL,
ALTER COLUMN "kelompok" SET NOT NULL,
ALTER COLUMN "kelompok" SET DATA TYPE TEXT;
