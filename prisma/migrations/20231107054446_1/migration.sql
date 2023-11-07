-- CreateTable
CREATE TABLE "Log" (
    "noLog" SERIAL NOT NULL,
    "tanggalLog" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "kategoriLog" TEXT NOT NULL,
    "actionLog" TEXT NOT NULL,
    "beforeLog" TEXT NOT NULL,
    "afterLog" TEXT NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("noLog")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
