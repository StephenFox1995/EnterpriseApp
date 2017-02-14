const Sequelize = require('sequelize');

module.exports = (connectionString) => {
  if (connectionString) {
    const connection = new Sequelize(connectionString);
    module.exports.connection = connection;
    return connection;
  } else if (module.exports.connection) {
    return module.exports.connection;
  }
  throw (new Error('Not connected to any database'));
};
