module.exports = (sequelize, dataTypes) => {

    const alias = 'Genero';

    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        active : {
            type : dataTypes.INTEGER(1),
            allowNull : false,
            defaultValue : 1
        }
    }

    const config = {
        tableName : 'genres',
        timestamps : true,
        underscored : true
    }

    const Genre = sequelize.define(alias, cols, config)

    Genre.associate = function(models){
        Genre.hasMany(models.Pelicula,{
            as: 'peliculas',
            foreignKey: 'genre_id'
        })
    }

    return Genre
}