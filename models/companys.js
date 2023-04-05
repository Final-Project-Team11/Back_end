"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Companys extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Teams, {
                sourceKey: "companyId",
                foreignKey: "companyId",
            });
        }
    }
    Companys.init(
        {
            companyId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            companyName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            companyNum: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            ceoName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            ceoNum: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Companys",
        }
    );
    return Companys;
};
