module.exports = (sequelize, dataTypes) =>{
   
    const alias = 'Actor';

    const cols = {
        id: {
        type: dataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
        },
        first_name: {
        type: dataTypes.STRING(100),
        allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1)
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER.UNSIGNED
        },
        country: {
            type: dataTypes.STRING(255)
        }

    }

    
    const config = {
        tableName : 'actors',
        timestamps : true,
        underscored : true
    }

    const Actor = sequelize.define(alias, cols, config)

    Actor.associate = function(models){
        Actor.belongsToMany(models.Pelicula,{
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id"
        })

        Actor.belongsTo(models.Pelicula,{
            as: "favorita",
            foreignKey: "favorite_movie_id"
        })
    }

    return Actor
}