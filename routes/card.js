const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var express = require('express');
var router = express.Router();
const multer = require('multer')
const {extname} = require("path");
const fs = require('fs');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads/cards');
      }
      cb(null, 'uploads/cards')
    },
    filename: function (req, file, cb) {
        const fileExt = extname(file.originalname)
        const newFilename = `${file.fieldname}-${Date.now()}${fileExt}`
        cb(null, newFilename)
    }
})

const upload = multer({storage: storage})

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
          select: { skill: true }
        }
      },
    });
    res.statusCode = 200;
    res.end(JSON.stringify({ allcards }));
  })

  .post(upload.single('picture'), async function (req,res){
    try{  
      const card = await prisma.card.create({
        data: {
              name: req.body.name,
              picture: req.file.filename,
              type: req.body.type,
              class: req.body.class,
              strenght: req.body.strenght,
              // Liaison entre carte et une compétence déja créer
              skills:{
                create : [
                  {
                    skill:{
                      connect:{
                        id: parseInt(req.body.skillId)
                      }
                    }
                  }
                ]
              }
          }
      })
      console.log(card)
      res.status(200).json({ message: 'Carte bien créer.'})
    }catch(err){
      res.status(400)
      res.send('Erreur')
    }
  })
  router
    .get('/:id', async function (req,res){
      const card = await prisma.card.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          skills: {
            select: { skill: true }
          }
        },
      })
      res.send(card)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{
        const card = await prisma.card.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            name: req.body.name,
            picture: req.body.picture,
            type: req.body.type,
            class: req.body.class,
            strenght: req.body.strenght,
            skills:{
              create : [
                {
                  skill:{
                    connect:{
                      id: parseInt(req.body.skillId)
                    }
                  }
                }
              ]
            }
          }
        })
        res.status(200).json({ message: 'Carte bien modifié.'})
      }
      catch(err){
        res.status(400)
        res.send('Erreur')
      }

    })
    .delete('/:id', async function (req,res){
      const card = await prisma.card.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'Carte supprimé.'})
    })

module.exports = router;