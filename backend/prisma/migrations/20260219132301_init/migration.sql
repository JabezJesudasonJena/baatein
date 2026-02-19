-- CreateTable
CREATE TABLE "userd" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "userd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userd"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
