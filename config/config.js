require('dotenv').config();
const env = process.env;
module.exports = {
  "production": {
      "username": env.MYSQL_USERNAME,
      "password": env.MYSQL_PASSWORD,
      "database": env.MYSQL_DATABASE,
      "host": env.MYSQL_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": env.DEV_MYSQL_USERNAME,
      "password": env.DEV_MYSQL_PASSWORD,
      "database": "Meer_Test",
      "host": env.DEV_MYSQL_HOST,
      "dialect": "mysql"
    },
    "development": {
      "username": env.DEV_MYSQL_USERNAME,
      "password": env.DEV_MYSQL_PASSWORD,
      "database": env.DEV_MYSQL_DATABASE,
      "host": env.DEV_MYSQL_HOST,
      "dialect": "mysql"
    }
  }
  
