/*
  Warnings:

  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `Nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "NameTag" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfilePicture" TEXT NOT NULL,
    "Biografy" TEXT NOT NULL,
    "Following" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("Biografy", "Email", "Following", "NameTag", "Password", "ProfilePicture", "id") SELECT "Biografy", "Email", "Following", "NameTag", "Password", "ProfilePicture", "id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_NameTag_key" ON "Usuario"("NameTag");
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
