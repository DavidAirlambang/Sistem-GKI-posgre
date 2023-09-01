-- AlterTable
ALTER TABLE "Ruangan" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Ruangan" ADD CONSTRAINT "Ruangan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
