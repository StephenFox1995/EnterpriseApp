const sequelize = require('./connection')('postgres://@localhost:5432/test');
const populate = require('./populate');

populate.populate();
