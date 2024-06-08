/*
  Warnings:

  - You are about to drop the column `medicalHistory` on the `Pets` table. All the data in the column will be lost.
  - Added the required column `healthStatus` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pets" RENAME COLUMN "medicalHistory" TO "healthStatus";