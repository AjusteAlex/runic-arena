-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Picture` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Class` VARCHAR(191) NOT NULL,
    `Strenght` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
