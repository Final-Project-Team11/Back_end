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
                targetKey: "Id",
                foreignKey: "Id",
                onDelete : "CASCADE"
            });

            this.belongsTo(models.Meetings, {
                targetKey: "Id",
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
            Id: {
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
            body: {
                allowNull: true,
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
