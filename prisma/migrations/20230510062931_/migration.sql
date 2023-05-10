-- DropForeignKey
ALTER TABLE `colorsonskills` DROP FOREIGN KEY `ColorsOnSkills_skillId_fkey`;

-- AddForeignKey
ALTER TABLE `ColorsOnSkills` ADD CONSTRAINT `ColorsOnSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
