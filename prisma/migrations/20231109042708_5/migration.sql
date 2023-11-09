/*
  Warnings:

  - A unique constraint covering the columns `[kodeProgram]` on the table `ProgramKerja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kodeProgram]` on the table `Viatikum` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProgramKerja_kodeProgram_key" ON "ProgramKerja"("kodeProgram");

-- CreateIndex
CREATE UNIQUE INDEX "Viatikum_kodeProgram_key" ON "Viatikum"("kodeProgram");
