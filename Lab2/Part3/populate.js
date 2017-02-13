const sequelize = require('./connection')();
const models = require('./models')();

module.exports.populate = () => {
  const judges = [
    { name: 'Stephen Fox', room: 8, ext: 18500001 },
    { name: 'Barry Smith', room: 9, ext: 18500002 },
    { name: 'Mary Kane', room: 10, ext: 18500003 },
    { name: 'Hedwig Riordan', room: 11, ext: 18500004 },
  ];

  sequelize.sync()
  .then(() => {
    judges.forEach((judge) => {
      models.Judge.create(judge);
    });
  })
  .then(() => {
    console.log('Inserted all judges');
  });
};
