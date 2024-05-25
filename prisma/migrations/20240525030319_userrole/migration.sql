-- CreateEnum
CREATE TYPE "userRoles" AS ENUM ('User', 'Admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "userRoles" NOT NULL DEFAULT 'User';
