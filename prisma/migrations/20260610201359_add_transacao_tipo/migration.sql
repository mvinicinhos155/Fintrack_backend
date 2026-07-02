-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('DEPOSITO', 'SAQUE', 'TRANSFERENCIA');

-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "tipo" "TipoTransacao" NOT NULL DEFAULT 'TRANSFERENCIA';
