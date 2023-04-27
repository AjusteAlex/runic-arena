const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer()

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

  .post(upload.none(), async function (req,res){
    try{  const card = await prisma.card.create({
        data: {
              name: req.body.name,
              picture: req.body.picture,
              type: req.body.type,
              class: req.body.class,
              strenght: req.body.strenght
          }
      })
      res.status(200).json({ message: 'Carte bien créer.'})
      res.send('ok')
    }catch(err){
      res.status(400)
      res.send('Erreur')
    }
  })

module.exports = router;