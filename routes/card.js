const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var express = require("express");
var router = express.Router();
const multer = require("multer");
const { extname } = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // if (!fs.existsSync('uploads')) {
    //   fs.mkdirSync('uploads/cards');
    // }
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileExt = extname(file.originalname);
    const newFilename = `${file.fieldname}-${Date.now()}${fileExt}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const allcards = await prisma.card.findMany({
      include: {
        skills: {
          select: { skill: true },
        },
        type: true,
        classe: true,
      },
    });
    res.statusCode = 200;
    res.end(JSON.stringify({ allcards }));
  })

  // AJOUTER LIAISON CARTE -> TYPE ET CARTE -> CLASSE
  .post(upload.single("picture"), async function (req, res) {
    console.log(req.body);
    let cardData = {
      name: req.body.name,
      picture: req.file.filename,
      strenght: req.body.strenght,
      classeid: parseInt(req.body.classe),
      typeid: parseInt(req.body.type),
    };
    // AJOUTER CONDITION 3 COMPETENCES MAX
    if (req.body.skillIds) {
      cardData.skills = {
        create: req.body.skillIds.map((skillId) => ({
          skill: {
            connect: { id: parseInt(skillId) },
          },
        })),
      };
    }
    try {
      const card = await prisma.card.create({
        data: cardData,
      });
      res.status(200).json({ message: "Carte bien crée." });
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  });
router
  .get("/:id", async function (req, res) {
    const card = await prisma.card.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        skills: {
          select: { skill: true },
        },
        type: true,
        classe: true,
      },
    });
    res.send(card);
  })
  .put("/:id", upload.single("picture"), async function (req, res) {
    let data = {
      name: req.body.name,
      strenght: req.body.strenght,
      classeid: parseInt(req.body.classe),
      typeid: parseInt(req.body.type),
    };
    if (req.file) {
      data.picture = req.file.filename;
    }
    if (req.body.skillId) {
      try {
        if (req.body.skillIds) {
          cardData.skills = {
            create: req.body.skillIds.map((skillId) => ({
              skill: {
                connect: { id: parseInt(skillId) },
              },
            })),
          };
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({
          error:
            "Une erreur s'est produite lors de la recherche de la compétence.",
        });
      }
    }
    try {
      const card = await prisma.card.update({
        where: {
          id: parseInt(req.params.id),
        },
        data,
      });
      res.status(200).json({ message: "Carte bien modifiée." });
    } catch (err) {
      res.send(err);
    }
  })
  .delete("/:id", async function (req, res) {
    const card = await prisma.card.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: "Carte supprimée." });
  })

  .delete("/:id/cardskill/:skillId", async function (req, res) {
    const skillCard = await prisma.skillsOnCards.deleteMany({
      where: {
        cardId: parseInt(req.params.id),
        skillId: parseInt(req.params.skillId),
      },
    });
    res.status(200).json({ message: "Relation supprimée." });
  });

module.exports = router;
