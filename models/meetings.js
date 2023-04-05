"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Meetings extends Model {
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

            this.belongsTo(models.Events, {
                targetKey: "eventId",
                foreignKey: "eventId",
            });

            this.hasOne(models.MeetingReports, {
                sourceKey: "eventId",
                foreignKey: "meetingId",
            });
        }
    }
    Meetings.init(
        {
            eventId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            startDay: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            startTime: {
                allowNull: false,
                type: DataTypes.TIME,
            },
            location: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            file: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            content: {
                allowNull: true,
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
            modelName: "Meetings",
        }
    );
    return Meetings;
};
