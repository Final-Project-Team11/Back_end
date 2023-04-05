"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Mentions extends Model {
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
            });

            this.belongsTo(models.Meetings, {
                targetKey: "eventId",
                foreignKey: "eventId",
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
            });
        }
    }
    Mentions.init(
        {
            mentionId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            eventId: {
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
            modelName: "Mentions",
        }
    );
    return Mentions;
};
