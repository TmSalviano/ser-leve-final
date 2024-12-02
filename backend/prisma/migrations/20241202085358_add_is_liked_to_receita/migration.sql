-- CreateTable
CREATE TABLE "Notificacao" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Mensagem" TEXT NOT NULL,
    "SentBy" INTEGER NOT NULL,
    "SendTo" INTEGER NOT NULL,
    "Criado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notificacao_SentBy_fkey" FOREIGN KEY ("SentBy") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Notificacao_SendTo_fkey" FOREIGN KEY ("SendTo") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Receita" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UsuarioId" INTEGER NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Resumo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Imagem" TEXT,
    "Criado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "IsLiked" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Receita_UsuarioId_fkey" FOREIGN KEY ("UsuarioId") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Receita" ("Criado", "Descricao", "Id", "Imagem", "Resumo", "Titulo", "UsuarioId") SELECT "Criado", "Descricao", "Id", "Imagem", "Resumo", "Titulo", "UsuarioId" FROM "Receita";
DROP TABLE "Receita";
ALTER TABLE "new_Receita" RENAME TO "Receita";
CREATE INDEX "Receita_UsuarioId_Criado_idx" ON "Receita"("UsuarioId", "Criado");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
