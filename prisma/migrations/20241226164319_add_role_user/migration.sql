-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'MEMBER';
