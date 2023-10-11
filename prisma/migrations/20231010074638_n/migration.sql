/*
  Warnings:

  - The primary key for the `ProgramKerja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `no` on the `ProgramKerja` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProgramKerja" DROP CONSTRAINT "ProgramKerja_pkey",
DROP COLUMN "no",
ADD COLUMN     "noProker" SERIAL NOT NULL,
ADD CONSTRAINT "ProgramKerja_pkey" PRIMARY KEY ("noProker");
