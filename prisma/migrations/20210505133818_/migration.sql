/*
  Warnings:

  - You are about to drop the column `spent_time` on the `numbers_records` table. All the data in the column will be lost.
  - Added the required column `time_spent` to the `numbers_records` table without a default value. This is not possible if the table is not empty.

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
    "time_spent" REAL NOT NULL
);
INSERT INTO "new_numbers_records" ("id", "user_id", "user_name", "answer", "win", "date", "time_limit", "time_spent") SELECT "id", "user_id", "user_name", "answer", "win", "date", "time_limit", "spent_time" FROM "numbers_records";
DROP TABLE "numbers_records";
ALTER TABLE "new_numbers_records" RENAME TO "numbers_records";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
