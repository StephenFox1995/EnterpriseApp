const express = require('express');
const bodyParser = require('body-parser');
require('./connection')('postgres://@localhost:5432/test');
const models = require('./models')();
const Validator = require('./validator');

const app = express();
const validator = new Validator();
app.use(bodyParser.json());
app.listen(3000, () => console.log('Listening on port 3000!'));

function response(status, message) {
  return { status, message };
}

// Judge
// C
app.post('/judge', validator.validateJudge, (req, res) => {
  const judge = req.judge;
  models.Judge.create(judge)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/judge/:id', (req, res) => {
  const id = req.params.id;
  models.Judge.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.patch('/judge/:id', validator.validateJudge, (req, res) => {
  const id = req.params.id;
  const judge = req.judge;
  models.Judge.update(judge, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/judge/:id', (req, res) => {
  const id = req.params.id;
  // Delete from case table first.
  models.Case.destroy({ where: { judge_id: id } })
    .then(() => {
      models.Judge.destroy({ where: { id } });
    })
    .then(() => res.send(response('success', 'deleted successfully')))
    .then(err => res.send(response('failed', err.message)));
});

// Courtroom
// C
app.post('/courtroom', validator.validateCourtroom, (req, res) => {
  const courtroom = req.courtroom;
  models.Courtroom.create(courtroom)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/courtroom/:id', (req, res) => {
  const id = req.params.id;
  models.Courtroom.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.patch('/courtroom/:id', validator.validateCourtroom, (req, res) => {
  const id = req.params.id;
  const courtroom = req.courtroom;
  models.Courtroom.update(courtroom, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/courtroom/:id', (req, res) => {
  const id = req.params.id;
  // Delete from case table first.
  models.Case.destroy({ where: { courtroom_id: id } })
    .then(() => {
      models.Courtroom.destroy({ where: { id } });
    })
    .then(() => res.send(response('success', 'deleted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});

// Participent
// C
app.post('/participent', validator.validateParticipent, (req, res) => {
  const participent = req.participent;
  models.Participent.create(participent)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/participent/:id', (req, res) => {
  const id = req.params.id;
  models.Participent.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.patch('/participent/:id', validator.validateParticipent, (req, res) => {
  const id = req.params.id;
  const participent = req.participent;
  models.Participent.update(participent, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/participent/:id', (req, res) => {
  const id = req.params.id;
  // Delete from case table first.
  models.Case.destroy({ where: { $or: [{ claimant_id: id }, { respondent_id: id }] } })
    .then(() => {
      models.Participent.destroy({ where: { id } });
    })
    .then(() => res.send(response('success', 'deleted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});

// Case
// C
app.post('/case', validator.validateCase, (req, res) => {
  const newCase = req.case;
  models.Case.create(newCase)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/case/:id', (req, res) => {
  const id = req.params.id;
  models.Case.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.patch('/case/:id', validator.validateCase, (req, res) => {
  const id = req.params.id;
  const updatedCase = req.case;
  models.Case.update(updatedCase, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/case/:id', (req, res) => {
  const id = req.params.id;
  models.Case.destroy({ where: { id } })
    .then(() => res.send(response('success', 'deleted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
