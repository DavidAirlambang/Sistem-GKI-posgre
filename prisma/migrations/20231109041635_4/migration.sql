/*
  Warnings:

  - Added the required column `kodeProgram` to the `ProgramKerja` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeProgram` to the `Viatikum` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProgramKerja" ADD COLUMN     "kodeProgram" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Viatikum" ADD COLUMN     "kodeProgram" TEXT NOT NULL;
