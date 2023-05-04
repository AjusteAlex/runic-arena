-- DropIndex
DROP INDEX `AbilitiesOnSkills_abilityId_fkey` ON `abilitiesonskills`;

-- DropIndex
DROP INDEX `ColorsOnCards_colorId_fkey` ON `colorsoncards`;

-- DropIndex
DROP INDEX `ColorsOnSkills_colorId_fkey` ON `colorsonskills`;

-- DropIndex
DROP INDEX `SkillsOnCards_cardId_fkey` ON `skillsoncards`;

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
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnCards` ADD CONSTRAINT `ColorsOnCards_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ColorsOnCards` ADD CONSTRAINT `ColorsOnCards_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
