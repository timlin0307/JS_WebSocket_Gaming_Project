const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return sequelize.define('Account', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        character: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // Other model options go here
    })
}