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
                sourceKey: "Id",
                foreignKey: "Id",
            });

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

            this.hasOne(models.MeetingReports, {
                sourceKey: "Id",
                foreignKey: "meetingId",
            });
        }
    }
    Meetings.init(
        {
            Id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            start: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            end: {
                allowNull: false,
                type: DataTypes.DATE,
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
            body: {
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
