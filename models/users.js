"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Events, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasOne(models.Mentions, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.CategoryTodos, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Todos, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Comments, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Vacations, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Schedules, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Meetings, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Reports, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.MeetingReports, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.hasMany(models.Others, {
                sourceKey: "userId",
                foreignKey: "userId",
            });

            this.belongsTo(models.Teams, {
                targetKey: "teamId",
                foreignKey: "teamId",
            });

            this.belongsTo(models.Companys, {
                targetKey: "companyId",
                foreignKey: "companyId",
            });
        }
    }
    Users.init(
        {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            userName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            companyId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            teamId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            remainDay: {
                allowNull: false,
                type: DataTypes.INTEGER,
                defaultValue: 15,
            },
            salaryDay: {
                type: DataTypes.INTEGER,
            },
            rank: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            authLevel: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            joinDay: {
                allowNull: true,
                type: DataTypes.DATE,
            },
            job: {
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
            modelName: "Users",
        }
    );
    return Users;
};
