-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contactNumber" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "role" DROP DEFAULT;
