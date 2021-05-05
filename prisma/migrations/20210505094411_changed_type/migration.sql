/*
  Warnings:

  - You are about to alter the column `time_limit` on the `numbers_records` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `remaining_time` on the `numbers_records` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_numbers_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "answer" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "date" DATETIME NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "remaining_time" REAL NOT NULL
);
INSERT INTO "new_numbers_records" ("id", "user_id", "user_name", "answer", "win", "date", "time_limit", "remaining_time") SELECT "id", "user_id", "user_name", "answer", "win", "date", "time_limit", "remaining_time" FROM "numbers_records";
DROP TABLE "numbers_records";
ALTER TABLE "new_numbers_records" RENAME TO "numbers_records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
