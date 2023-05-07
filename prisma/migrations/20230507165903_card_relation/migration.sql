/*
  Warnings:

  - You are about to drop the column `classeId` on the `card` table. All the data in the column will be lost.
  - Added the required column `classeid` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeid` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `AbilitiesOnSkills_abilityId_fkey` ON `abilitiesonskills`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId1_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId2_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId3_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId4_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId5_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `SkillsOnCards_cardId_fkey` ON `skillsoncards`;

-- AlterTable
ALTER TABLE `card` DROP COLUMN `classeId`,
    ADD COLUMN `classeid` INTEGER NOT NULL,
    ADD COLUMN `typeid` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_classeid_fkey` FOREIGN KEY (`classeid`) REFERENCES `Classe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_typeid_fkey` FOREIGN KEY (`typeid`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
