/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Reminder` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reminder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" BIGINT NOT NULL,
    "content" TEXT NOT NULL,
    "important" BOOLEAN NOT NULL
);
INSERT INTO "new_Reminder" ("content", "createdAt", "id", "important") SELECT "content", "createdAt", "id", "important" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
