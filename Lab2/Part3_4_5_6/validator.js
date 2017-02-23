const models = require('./models')();

function Validator() { }

const failedMessage = (status, reason) => ({ status, reason });

Validator.prototype.validateParticipent = (req, res, next) => {
  const participent = req.body.participent || null;
  if (!participent) {
    return res.status(422).json(failedMessage('Failed', 'No participent object'));
  }
  if (!('name' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No name given'));
  }
  if (!('address' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No address given'));
  }
  if (!('type' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No type given'));
  }
  req.participent = participent;
  return next();
};

Validator.prototype.validateCourtroom = (req, res, next) => {
  const courtroom = req.body.courtroom || null;
  if (!courtroom) {
    return res.status(422).json(failedMessage('Failed', 'No courtroom object'));
  }
  if (!('number' in courtroom)) {
    return res.status(422).json(failedMessage('Failed', 'No number given'));
  }
  req.courtroom = courtroom;
  return next();
};

Validator.prototype.validateJudge = (req, res, next) => {
  const judge = req.body.judge || null;
  if (!judge) {
    return res.status(422).json(failedMessage('Failed', 'No judge object'));
  }
  if (!('name' in judge)) {
    return res.status(422).json(failedMessage('Failed', 'No name given'));
  }
  if (!('room' in judge)) {
    return res.status(422).json(failedMessage('Failed', 'No room given'));
  }
  if (!('ext' in judge)) {
    return res.status(422).json(failedMessage('Failed', 'No ext given'));
  }
  req.judge = judge;
  return next();
};

Validator.prototype.validateCase = (req, res, next) => {
  const newCase = req.body.case || null;
  if (!newCase) {
    return res.status(422).json(failedMessage('Failed', 'No case object'));
  }
  if (!('judge_id' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No judge_id given'));
  }
  if (!('courtroom_id' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No courtroom_id given'));
  }
  if (!('respondent_id' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No respondent_id given'));
  }
  if (!('start_date' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No start_date given'));
  }
  if (!('duration' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No duration given'));
  }
  if (!('result' in newCase)) {
    return res.status(422).json(failedMessage('Failed', 'No result given'));
  }
  // Check no double booking for courtrooms is allowed.
  models.Case.findAll({
    where: {
      $and: { courtroom_id: newCase.courtroom_id, start_date: newCase.start_date },
    },
  })
    .then((data) => {
      console.log(data);
      if (data.length > 1) {
        res.status(422).json(failedMessage('Failed', 'No double bookings allowed given'));
      }
      next();
    });
};

module.exports = Validator;
