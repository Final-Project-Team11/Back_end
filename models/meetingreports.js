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
                onDelete : "CASCADE"
            });

            this.belongsTo(models.Meetings, {
                targetKey: "eventId",
                foreignKey: "meetingId",
                onDelete : "CASCADE"
            });
            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
                onDelete : "CASCADE"
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
            enrollDay: {
                allowNull: false,
                type: DataTypes.DATE,
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
