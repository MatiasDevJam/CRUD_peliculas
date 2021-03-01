const db = require('../database/models')

module.exports = {
    show: (req,res) =>{
        db.Actor.findOne({
            where: {
                id: req.params.id
            },
            include: [
            {
                association: 'peliculas'
            }
            ]
        })
        .then(actor => res.render('actorsShow',{actor}))
        .catch(e => res.send(e))

    }
}