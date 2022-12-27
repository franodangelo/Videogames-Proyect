const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("videogame", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        released: {
            type: DataTypes.DATEONLY
        },
        rating: {
            type: DataTypes.DECIMAL
        },
        platforms: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        createdInDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        ratings: {
            type: DataTypes.JSONB
        },
        metacritic: {
            type: DataTypes.DECIMAL
        },
        playtime: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false
        },
        esrbRating: {
            type: DataTypes.JSON
        },
        shortScreenshots: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    })
}