const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var express = require('express');
var router = express.Router();
const multer = require('multer')
const upload = multer()


// ================= AJOUTER UPLOAD D'ICON ===========================

router
  .route("/")
  .get(async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const alltypes = await prisma.type.findMany({});
    res.statusCode = 200;
    res.end(JSON.stringify({ alltypes }));
  })

  .post(upload.none(),async function (req,res){
    try{  
       const type = await prisma.type.create({
         data: {
           name: req.body.name
         }
       })
       console.log('ici')
      res.status(200).json({ message: 'type bien créer.'})
      }catch(err){
      res.status(400)
      res.send(err)
    }
  })

  router
    .get('/:id', async function (req,res){
      const type = await prisma.type.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.send(type)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{  
        const type = await prisma.type.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            name: req.body.name
          }
        })
        res.status(200).json({ message: 'type bien modifié.'})
      }
      catch(err){
        res.send(err);
      }
    })
    .delete('/:id', async function (req,res){
      const type = await prisma.type.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'type supprimé.'})
    })

module.exports = router;