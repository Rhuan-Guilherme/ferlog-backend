-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "remetente" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "n_ctrc" TEXT NOT NULL,
    "unidade" TEXT NOT NULL,
    "valor_ctrc" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
