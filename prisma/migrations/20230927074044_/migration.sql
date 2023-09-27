/*
  Warnings:

  - A unique constraint covering the columns `[noSuratMasuk]` on the table `SuratMasuk` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SuratMasuk_noSuratMasuk_key" ON "SuratMasuk"("noSuratMasuk");
