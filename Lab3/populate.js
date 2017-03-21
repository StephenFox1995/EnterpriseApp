const sequelize = require('./connection')('postgres://@localhost:5432/auth');
const models = require('./models')();

module.exports.populate = (() => {
  const judges = [
    { name: 'Stephen Fox', room: 8, ext: 18500001 },
    { name: 'Barry Smith', room: 9, ext: 18500002 },
    { name: 'Mary Kane', room: 10, ext: 18500003 },
    { name: 'Hedwig Riordan', room: 11, ext: 18500004 },
  ];
  const courtrooms = [
    { number: 32 },
    { number: 48 },
    { number: 11 },
    { number: 3 },
    { number: 8 },
  ];
  const participents = [
    { name: 'Bob Fries', address: '9241 Homestead Dr. Morganton, NC 28655', type: 'claimant' },
    { name: 'Neil Gaff', address: '8197 East Wild Horse Rd. Montgomery, AL 36109', type: 'respondent' },
    { name: 'David Phoenix', address: '646 N. Water Drive Natchez, MS 39120', type: 'respondent' },
    { name: 'Clair Ashton', address: '7702 W. Hudson Dr. Downingtown, PA 19335', type: 'claimant' },
  ];
  const cases = [
    { judge_id: 1,
      courtroom_id: 3,
      claimant_id: 1,
      respondent_id: 2,
      start_date: Date.now(),
      duration: 1,
      result: true,
    },
    { judge_id: 2,
      courtroom_id: 4,
      claimant_id: 4,
      respondent_id: 3,
      start_date: Date.now(),
      duration: 2,
      result: false,
    },
  ];

  sequelize.sync()
    .then(() => {
      models.Judge.bulkCreate(judges);
      models.Courtroom.bulkCreate(courtrooms);
      models.Participent.bulkCreate(participents);
      models.Case.bulkCreate(cases);
    });
})();