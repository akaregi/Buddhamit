-- CreateTable
CREATE TABLE "numbers_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time_limit" DATETIME NOT NULL,
    "remaining_time" DATETIME NOT NULL
);
