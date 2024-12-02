/*
  Warnings:

  - You are about to drop the column `Following` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Follow" (
    "FollowerId" INTEGER NOT NULL,
    "FollowingId" INTEGER NOT NULL,

    PRIMARY KEY ("FollowerId", "FollowingId"),
    CONSTRAINT "Follow_FollowerId_fkey" FOREIGN KEY ("FollowerId") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follow_FollowingId_fkey" FOREIGN KEY ("FollowingId") REFERENCES "Usuario" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT,
    "NameTag" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfilePicture" TEXT,
    "Biografy" TEXT,
    "DarkMode" BOOLEAN NOT NULL DEFAULT false,
    "IsLoggedIn" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Usuario" ("Biografy", "DarkMode", "Email", "Id", "IsLoggedIn", "NameTag", "Nome", "Password", "ProfilePicture") SELECT "Biografy", "DarkMode", "Email", "Id", "IsLoggedIn", "NameTag", "Nome", "Password", "ProfilePicture" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_NameTag_key" ON "Usuario"("NameTag");
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
