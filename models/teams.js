"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Teams extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Users, {
                sourceKey: "teamId",
                foreignKey: "teamId",
            });

            this.belongsTo(models.Companys, {
                targetKey: "companyId",
                foreignKey: "companyId",
            });
        }
    }
    Teams.init(
        {
            teamId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            teamName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            companyId: {
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
            modelName: "Teams",
        }
    );
    return Teams;
};
