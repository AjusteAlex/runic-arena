const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const {faker} = require("@faker-js/faker");

async function main() {
    for (let i = 0; i < 10; i++) {
        await prisma.color.create({
            data: {
                color: faker.color.rgb(),
            },
        });
    }
    enumSkills = {
        Buff: [
            ["Esquive", "Les X prochaines attaques seront évitées."],
            ["Protection", "Bloque les X prochains dommages"],
            ["Critique", "Double les dommages des X prochaines attaques"],
            ["Rage", "Augmente l’attaque de X"],
        ],
        Debuff: [
            [
                "Malédiction",
                "Divise par 2 les dommages des X prochaines attaques de l’adversaire",
            ],
            ["Epuisement", "Réduit l’attaque de l’adversaire de X"],
            [
                "Folie",
                "À chaque attaque de votre adversaire, il a X% de chance de s’infliger des dégâts égaux à sa puissance",
            ],
            [
                "Capitulation",
                "À chaque attaque, votre adversaire à X% de chance d’arrêter sa série d’attaques",
            ],
        ],
        Dommage: [
            [
                "Contre attaque",
                "Pour les X prochaines attaques de votre adversaire, vous lui infligez des dommages égaux à votre puissance",
            ],
            ["Vol de vie", "Soigne X% des dommages infligés"],
            [
                "Frappe directe",
                "Pour les X prochaines attaques de votre carte, les dommages infligés ne peuvent être réduits par des débuffs ou buffs adverses",
            ],
        ],
    };
    enumAbilities = {
        Attaque: "Si la carte engage le duel, la compétence est déclenchée",
        Defend: "Si la carte défend sur le duel, la compétence est déclenchée",
        Avantage:
            "Si la carte adverse est d’un certain élément ou d’une classe spécifique, la compétence est déclenchée",
        Groupe:
            "Pour chaque carte d’un élément ou d’une classe spécifique dans sa main, la compétence est déclenchée",
    };
    enumTypes = ["Chaos", "Halo"];
    enumClasses = ["Mage", "Soigneur", "Guerrier", "Archer", "Assassin"];

    for (const prop in enumSkills) {
        if (enumSkills.hasOwnProperty(prop)) {
            // Pour chaque compétence dans le tableau de compétences correspondant
            const skillArray = enumSkills[prop];
            for (let i = 0; i < skillArray.length; i++) {
                // Créer la compétence avec le nom et l'attribut correspondants
                await prisma.skill.create({
                    data: {
                        name: skillArray[i][0],
                        attribute: prop,
                    },
                });
            }
        }
    }

    for (const key in enumAbilities) {
        if (enumAbilities.hasOwnProperty(key)) {
            stateRandom = faker.random.boolean() ? "Active" : "Passive";
            if (stateRandom === "Active") {
                await prisma.skill.create({
                    data: {
                        state: stateRandom,
                        name: key,
                        description: enumAbilities[key],
                        value: 0,
                    },
                });
            } else {
                await prisma.skill.create({
                    data: {
                        state: stateRandom,
                        name: null,
                        description: null,
                        value: 0,
                    },
                });
            }
        }
    }
    for (let i = 0; i < 10; i++) {
        classRandom =
            enumClasses[
                faker.datatype.number({
                    min: 0,
                    max: enumClasses.length,
                })
                ];
        await prisma.card.create({
            data: {
                name: classRandom + " " + faker.lorem.sentence(3),
                type: faker.random.boolean() ? "Chaos" : "Halo",
                class: classRandom,
                picture: "https://random.imagecdn.app/500/150",
                strenght: 0,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
