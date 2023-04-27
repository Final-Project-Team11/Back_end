"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Files extends Model {
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
        }
    }
    Files.init(
        {
            fileId: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            Id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            fileName: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            fileLocation: {
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
            modelName: "Files",
        }
    );
    return Files;
};
