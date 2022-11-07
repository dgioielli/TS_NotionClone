-- CreateTable
CREATE TABLE "World" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "World_Name_key" ON "World"("Name");
