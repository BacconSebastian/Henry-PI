const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      len: [1, 3],
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING
    },
    population: {
      type: DataTypes.INTEGER
    }
  },{
    timestamps: false
  })

}