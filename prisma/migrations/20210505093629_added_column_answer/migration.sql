/*
  Warnings:

  - Added the required column `answer` to the `numbers_records` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_numbers_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "time_limit" DATETIME NOT NULL,
    "remaining_time" DATETIME NOT NULL
);
INSERT INTO "new_numbers_records" ("id", "user_id", "username", "win", "date", "time_limit", "remaining_time") SELECT "id", "user_id", "username", "win", "date", "time_limit", "remaining_time" FROM "numbers_records";
DROP TABLE "numbers_records";
ALTER TABLE "new_numbers_records" RENAME TO "numbers_records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
