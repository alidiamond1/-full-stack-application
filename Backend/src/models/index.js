const sequelize = require('../config/database');
const Product = require('./product');

const db = {
    sequelize,
    Product
};

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true }); // Use alter to update tables without dropping
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

db.initDB = initDB;

module.exports = db;
