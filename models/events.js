"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Events extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Mentions, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.Vacations, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.Schedules, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.Meetings, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.Reports, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.MeetingReports, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.Others, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasMany(models.Comments, {
                sourceKey: "eventId",
                foreignKey: "eventId",
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
                onDelete : "CASCADE"
            });
        }
    }
    Events.init(
        {
            eventId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            eventType: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            hasFile: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            userId: {
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
            modelName: "Events",
        }
    );
    return Events;
};
