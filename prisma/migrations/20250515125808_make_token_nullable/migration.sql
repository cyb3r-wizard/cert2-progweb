-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT
);
INSERT INTO "new_User" ("id", "name", "password", "token", "username") SELECT "id", "name", "password", "token", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
