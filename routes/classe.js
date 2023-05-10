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

    const allclasses = await prisma.classe.findMany({});
    res.statusCode = 200;
    res.end(JSON.stringify({ allclasses }));
  })

  .post(upload.none(),async function (req,res){
    try{  
       const classe = await prisma.classe.create({
         data: {
           name: req.body.name
         }
       })
      res.status(200).json({ message: 'Classe bien crée.'})
      }catch(err){
      res.status(400)
      res.send(err)
    }
  })

  router
    .get('/:id', async function (req,res){
      const classe = await prisma.classe.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.send(classe)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{  
        const classe = await prisma.classe.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            name: req.body.name
          }
        })
        res.status(200).json({ message: 'Classe bien modifiée.'})
      }
      catch(err){
        res.send(err);
      }
    })
    .delete('/:id', async function (req,res){
      const classe = await prisma.classe.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'Classe supprimée.'})
    })

module.exports = router;