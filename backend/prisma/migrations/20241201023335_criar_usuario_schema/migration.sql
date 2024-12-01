-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "NameTag" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfilePicture" TEXT NOT NULL,
    "Biografy" TEXT NOT NULL,
    "Following" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_NameTag_key" ON "Usuario"("NameTag");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
