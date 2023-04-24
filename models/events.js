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
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.Vacations, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.Schedules, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.Meetings, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.Reports, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.MeetingReports, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasOne(models.Others, {
                sourceKey: "Id",
                foreignKey: "Id",
            });

            this.hasMany(models.Comments, {
                sourceKey: "Id",
                foreignKey: "Id",
            });
            this.hasMany(models.Files, {
                sourceKey: "Id",
                foreignKey: "Id",
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
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            calendarId: {
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
            isReadOnly: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: true,
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
