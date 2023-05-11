/*
  Warnings:

  - You are about to drop the `colorsonskills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `AbilitiesOnSkills_abilityId_fkey` ON `abilitiesonskills`;

-- DropIndex
DROP INDEX `Card_classeid_fkey` ON `card`;

-- DropIndex
DROP INDEX `Card_typeid_fkey` ON `card`;

-- DropIndex
DROP INDEX `SkillsOnCards_cardId_fkey` ON `skillsoncards`;

-- DropTable
DROP TABLE `colorsonskills`;

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
