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
  req.participent = judge;
  return next();
};

Validator.prototype.validateCase = (req, res, next) => {
  const _case = req.body.case || null;
  if (!_case) {
    return res.status(422).json(failedMessage('Failed', 'No case object'));
  }
};

module.exports = Validator;

