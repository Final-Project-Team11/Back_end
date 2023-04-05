"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MeetingReports extends Model {
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
                foreignKey: "meetingId",
            });
        }
    }
    MeetingReports.init(
        {
            eventId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            meetingId: {
                allowNull: false,
                type: DataTypes.INTEGER,
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
            modelName: "MeetingReports",
        }
    );
    return MeetingReports;
};
