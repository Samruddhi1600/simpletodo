-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userEmail_fkey";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "userEmail" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
