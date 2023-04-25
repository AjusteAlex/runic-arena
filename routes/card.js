const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var express = require('express');
var router = express.Router();

router
  .route("/")
  .get(async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const allcards = await prisma.card.findMany({});
    res.statusCode = 200;
    res.end(JSON.stringify({ allcards }));
  })
  .post(async function (req,res){
    try{
        const card = await prisma.card.create({
            data: {
                Name: "test",
                Picture: "image.test",
                Type: "Halo",
                Class: "Mage",
                Strenght: "75"
            }
        })
        res.json(card)
    }
    catch (error){
        res.statusCode = 400;
        res.end("Erreur produite sur la création d'une carte : ".error);
    }
  })

module.exports = router;