"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Vacations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Events, {
                targetKey: "Id",
                foreignKey: "Id",
                onDelete : "CASCADE"
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
                onDelete : "CASCADE"
            });
        }
    }
    Vacations.init(
        {
            Id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            start: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            end: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            typeDetail: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: "submit",
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
            modelName: "Vacations",
        }
    );
    return Vacations;
};
