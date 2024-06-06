-- CreateEnum
CREATE TYPE "AdoptedStatus" AS ENUM ('PENDING', 'ADOPTED');

-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "adoptedStatus" "AdoptedStatus" NOT NULL DEFAULT 'PENDING';
