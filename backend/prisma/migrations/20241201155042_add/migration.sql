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
    "Following" TEXT,
    "DarkMode" BOOLEAN NOT NULL DEFAULT false,
    "IsLoggedIn" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Usuario" ("Biografy", "Email", "Following", "Id", "NameTag", "Nome", "Password", "ProfilePicture") SELECT "Biografy", "Email", "Following", "Id", "NameTag", "Nome", "Password", "ProfilePicture" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_NameTag_key" ON "Usuario"("NameTag");
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
