function Validator() { }

const failedMessage = (status, reason) => ({ status, reason });

Validator.prototype.validateParticipent = (req, res, next) => {
  const participent = req.body.participent || null;
  if (!participent) {
    return res.status(422).json(failedMessage('Failed', 'No participent object'));
  }
  if (!('name' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No participent object'));
  }
  if (!('address' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No address object'));
  }
  if (!('type' in participent)) {
    return res.status(422).json(failedMessage('Failed', 'No type object'));
  }
  req.participent = participent;
  return next();
};

module.exports = Validator;

