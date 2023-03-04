-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "refreshTokenExp" TIMESTAMP(3),
    "confirmationToken" TEXT,
    "confirmationDate" TIMESTAMP(3),
    "forgotPasswordToken" TEXT,
    "forgotPasswordDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultImage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "messageId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "content" VARCHAR(3000) NOT NULL,
    "messageUrl" TEXT,

    CONSTRAINT "ResultImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_confirmationToken_key" ON "User"("confirmationToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_forgotPasswordToken_key" ON "User"("forgotPasswordToken");

-- CreateIndex
CREATE UNIQUE INDEX "ResultImage_messageId_key" ON "ResultImage"("messageId");
