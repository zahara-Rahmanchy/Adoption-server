-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "specialNeeds" TEXT[] DEFAULT ARRAY[]::TEXT[];
