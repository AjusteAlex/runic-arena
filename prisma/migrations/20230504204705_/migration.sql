-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `strenght` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attribute` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AbilitiesOnSkills` (
    `skillId` INTEGER NOT NULL,
    `abilityId` INTEGER NOT NULL,

    PRIMARY KEY (`skillId`, `abilityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillsOnCards` (
    `skillId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`skillId`, `cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ColorsOnSkills` (
    `skillId` INTEGER NOT NULL,
    `colorId1` INTEGER NOT NULL,
    `colorId2` INTEGER NOT NULL,
    `colorId3` INTEGER NOT NULL,
    `colorId4` INTEGER NOT NULL,
    `colorId5` INTEGER NOT NULL,

    UNIQUE INDEX `ColorsOnSkills_skillId_colorId1_key`(`skillId`, `colorId1`),
    UNIQUE INDEX `ColorsOnSkills_skillId_colorId2_key`(`skillId`, `colorId2`),
    UNIQUE INDEX `ColorsOnSkills_skillId_colorId3_key`(`skillId`, `colorId3`),
    UNIQUE INDEX `ColorsOnSkills_skillId_colorId4_key`(`skillId`, `colorId4`),
    UNIQUE INDEX `ColorsOnSkills_skillId_colorId5_key`(`skillId`, `colorId5`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_id_fkey` FOREIGN KEY (`id`) REFERENCES `Classe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilitiesOnSkills` ADD CONSTRAINT `AbilitiesOnSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilitiesOnSkills` ADD CONSTRAINT `AbilitiesOnSkills_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `Ability`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillsOnCards` ADD CONSTRAINT `SkillsOnCards_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillsOnCards` ADD CONSTRAINT `SkillsOnCards_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId1_fkey` FOREIGN KEY (`colorId1`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId2_fkey` FOREIGN KEY (`colorId2`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId3_fkey` FOREIGN KEY (`colorId3`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId4_fkey` FOREIGN KEY (`colorId4`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId5_fkey` FOREIGN KEY (`colorId5`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
