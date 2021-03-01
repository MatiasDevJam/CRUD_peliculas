const db = require('../database/models')
const {Op} = require('sequelize');
const moment = require('moment');

module.exports = {
    index: (req,res)=>{
        res.render('movies')
    },
    list: (req,res)=>{
        let peliculas = db.Pelicula.findAll({
            order: [
                ['title', 'ASC']
            ]
})
let cantidad = db.Pelicula.count();

let top = db.Pelicula.findAll({
    order: [
        ['rating', 'ASC']
    ],
    limit: 10
})

Promise.all([peliculas,cantidad,top])
        .then(([peliculas,cantidad,top]) =>{
            return res.render('moviesList', {
                peliculas,
                cantidad,
                top            
            })
        })
        .catch(error => res.send(error))
    },
    show: (req,res)=>{
        db.Pelicula.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    association: 'genero'
                },
                {
                    association: 'actores'
                }
            ]
        })
        .then(pelicula=>{
            return res.render('moviesShow',{
                pelicula,
                estreno: moment(pelicula.release_date).format('d MMMM YYYY')
            })
        })
        .catch(error => console.log(error))
    },
    create: (req,res)=>{
        db.Genero.findAll()
        .then(generos=>{
            return res.render('moviesAdd',{
                generos
            })
        })
        .catch(error => res.send(error))
    },
    store: (req,res)=>{
        const {title, rating, awards, release_date, length, genre_id} = req.body
        db.Pelicula.create({
            title: title.trim(),
            rating: +rating,
            awards: +awards,
            release_date,
            length: +length,
            genre_id: +genre_id
        })
        .then(() =>{
            return res.redirect('/movies/list')
        })
        .catch(error => res.send(error))
    },
    edit: (req,res)=>{
        let pelicula = db.Pelicula.findByPk(req.params.id)
        let generos = db.Genero.findAll()
        Promise.all([pelicula, generos])
        .then(([pelicula, generos])=>{
            return res.render('moviesEdit', {
                pelicula,
                generos,
                estreno: moment(pelicula.release_date).format('YYYY-MM-DD')
            })
        })
        .catch(error => res.send(error))
    },
    update: (req,res)=>{
        
        const {title, rating, awards, release_date, length, genre_id} = req.body
        db.Pelicula.update({
            title: title.trim(),
            rating: +rating,
            awards: +awards,
            release_date,
            length: +length,
            genre_id: +genre_id
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            return res.redirect('/movies/show'+req.params.id)
        })
        .catch(error => res.send(error))
    },
    remove: (req,res)=>{
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() =>res.redirect('/movies/list'))
        .catch(error => res.send(error))
    },
    search: (req,res)=>{
        db.Pelicula.findAll({
            where: {
                title: {
                    [Op.like] : `%${req.query.busqueda}%`
                }
            }
        })
        .then(peliculas =>{
            return res.render('moviesResult',{
                peliculas
            })
        })
        .catch(error =>console.log(error))
    }
}