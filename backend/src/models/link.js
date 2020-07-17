// const { sequelize } = require(".");
// const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define('Link', {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false

        },
        social: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

    Link.associate = (models) => {
        Link.belongsTo(models.Account, {foreignKey:'accountId'});
    };

    return Link;
};