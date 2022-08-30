const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {

  sequelize.define('activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.INTEGER,
        isIn(value) {
            if (value < 1 || value > 5) {
                throw new Error('Value must be between 1 and 5');
            }
        },
        allowNull: false
    },
    duration: {
        type: DataTypes.FLOAT
    },
    season: {
        type: DataTypes.STRING,
        isIn(value) {
            if (value != 'Summer' && value != 'Winter' && value != 'Spring' && value != 'Autumn') {
                throw new Error('Value must be a season (Summer, Winter, Spring, Autumn)');
            }
        }
    }
  },{
    timestamps: false
  })

}