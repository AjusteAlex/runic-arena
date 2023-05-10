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

    const allcolors = await prisma.color.findMany({});
    res.statusCode = 200;
    res.end(JSON.stringify({ allcolors }));
  })

  .post(upload.none(), async function (req,res){
    try{ 
      const color = await prisma.color.create({
        data: {
            color: req.body.color,
        }
      })
      res.status(200).json({ message: 'Couleur bien crée.'})
    }catch(err){
      res.status(400)
      res.send('Erreur')
    }
  })
  router
    .get('/:id', async function (req,res){
      const color = await prisma.color.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.send(color)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{
        const color = await prisma.color.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            color: req.body.color,
          }
        })
        res.status(200).json({ message: 'Couleur bien modifiée.'})
      }
      catch(err){
        res.status(400)
        res.send('Erreur')
      }

    })
    .delete('/:id', async function (req,res){
      const color = await prisma.color.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'Couleur supprimée.'})
    })

module.exports = router;