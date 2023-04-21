"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Schedules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Events, {
                targetKey: "eventId",
                foreignKey: "eventId",
                onDelete : "CASCADE"
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
                onDelete : "CASCADE"
            });
        }
    }
    Schedules.init(
        {
            eventId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            startDay: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            endDay: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            fileName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            fileLocation: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: "submit",
            },
            location: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: "Schedules",
        }
    );
    return Schedules;
};
