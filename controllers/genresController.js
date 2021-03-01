const db = require('../database/models')

module.exports = {
    index: (req,res)=>{
    },
    list:  (req,res)=>{
    },
    show: (req,res)=>{
        db.Genero.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                association: 'peliculas'
                }
            ]
        })
        .then(genero =>{
            return res.render('genresShow',{
                genero
            })
        })
        .catch(e => res.send(e))   
    },
    create: (req,res)=>{
    },
    store: (req,res)=>{
    },
    edit: (req,res)=>{
    },
    update: (req,res)=>{
    },
    remove: (req,res)=>{
    },
    search: (req,res)=>{
    }
}