"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Todos extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.CategoryTodos, {
                targetKey: "categoryId",
                foreignKey: "categoryId",
            });

            this.belongsTo(models.Users, {
                targetKey: "userId",
                foreignKey: "userId",
            });
        }
    }
    Todos.init(
        {
            todoId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            categoryId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            todo: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            isDone: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: "Todos",
        }
    );
    return Todos;
};
