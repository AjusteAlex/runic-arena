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

    const allskills = await prisma.skill.findMany({
      // include: {
      //   colors: {
      //     select: { color: true }
      //   },
      // },
    });
    res.statusCode = 200;
    res.end(JSON.stringify({ allskills }));
  })

  .post(upload.none(), async function (req,res){
    let skillData = {
      attribute: req.body.attribute,
      name: req.body.name,
      description: req.body.description,
    }
    // if(req.body.colorsIds){
    //   skillData.colors = {
    //     create: req.body.colorsIds.map(colorId =>  
    //       ({
    //         color:{ 
    //           connect:{id: parseInt(colorId)},
    //         }
    //       })
    //     )
    //   }
    // }
    try{  
      const skill = await prisma.skill.create({
        data : skillData
      })
      res.status(200).json({ message: 'Compétence bien crée.'})
    }catch(err){
      res.status(400)
      res.send('Erreur')
    }
  })
  router
    .get('/:id', async function (req,res){
      const skill = await prisma.skill.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      })
      res.send(skill)
    })
    .put('/:id', upload.none(), async function (req,res){
      try{
        const skill = await prisma.skill.update({
          where: {
            id: parseInt(req.params.id),
          },
          data: {
            attribute: req.body.attribute,
            name: req.body.name,
            description: req.body.description
          }
        })
        res.status(200).json({ message: 'Compétence bien modifiée.'})
      }
      catch(err){
        res.status(400)
        res.send('Erreur')
      }

    })
    .delete('/:id', async function (req,res){
      const skill = await prisma.skill.delete({
        where: {
          id: parseInt(req.params.id),
        }
      })
      res.status(200).json({ message: 'Compétence supprimée.'})
    })

module.exports = router;