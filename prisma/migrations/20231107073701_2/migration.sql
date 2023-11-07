/*
  Warnings:

  - You are about to drop the column `afterLog` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `beforeLog` on the `Log` table. All the data in the column will be lost.
  - Added the required column `keterangan` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "afterLog",
DROP COLUMN "beforeLog",
ADD COLUMN     "keterangan" TEXT NOT NULL;
