/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `Id` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "NameTag" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfilePicture" TEXT NOT NULL,
    "Biografy" TEXT NOT NULL,
    "Following" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("Biografy", "Email", "Following", "NameTag", "Nome", "Password", "ProfilePicture") SELECT "Biografy", "Email", "Following", "NameTag", "Nome", "Password", "ProfilePicture" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_NameTag_key" ON "Usuario"("NameTag");
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
