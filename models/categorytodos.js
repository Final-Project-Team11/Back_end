"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CategoryTodos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Todos, {
                sourceKey: "categoryId",
                foreignKey: "categoryId",
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
                onDelete : "CASCADE"
            });
        }
    }
    CategoryTodos.init(
        {
            categoryId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            categoryName: {
                allowNull: false,
                type: DataTypes.STRING,
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
            modelName: "CategoryTodos",
        }
    );
    return CategoryTodos;
};
