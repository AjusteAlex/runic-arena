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
