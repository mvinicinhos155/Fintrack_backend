-- CreateEnum
CREATE TYPE "TypeRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "role" "TypeRole" NOT NULL DEFAULT 'USER';
