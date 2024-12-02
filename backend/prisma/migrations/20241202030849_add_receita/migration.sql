-- CreateTable
CREATE TABLE "Receita" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UsuarioId" INTEGER NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Resumo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Imagem" TEXT,
    "Criado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Receita_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Receita_UsuarioId_Criado_idx" ON "Receita"("UsuarioId", "Criado");
