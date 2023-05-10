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

    const allabilities = await prisma.ability.findMany({});
    res.statusCode = 200;
    res.end(JSON.stringify({ allabilities }));
  })

  .post(upload.none(), async function (req,res){
    try{ 
      const ability = await prisma.ability.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            value: parseInt(req.body.value),
            state: req.body.state
        }
      })
      res.status(200).json({ message: 'Capacité bien crée.'})
    }catch(err){
      res.status(400)
      res.send('Erreur')
    }
  })
  router
    .get('/:id', async function (req,res){
      const ability = await prisma.ability.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.send(ability)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{
        const ability = await prisma.ability.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            name: req.body.name,
            description: req.body.description,
            value: parseInt(req.body.value),
            state: req.body.state
          }
        })
        res.status(200).json({ message: 'Capacité bien modifiée.'})
      }
      catch(err){
        res.status(400)
        res.send('Erreur')
      }

    })
    .delete('/:id', async function (req,res){
      const ability = await prisma.ability.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'Capacité supprimée.'})
    })

module.exports = router;