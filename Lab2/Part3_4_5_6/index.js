const express = require('express');
const bodyParser = require('body-parser');
require('./connection')('postgres://@localhost:5432/test');
const models = require('./models')();
const Validator = require('./validator');

const app = express();
const validator = new Validator();
app.use(bodyParser.json());
app.listen(3000, () => console.log('Listening on port 3000!'));


// C
app.post('/judge', validator.validateJudge, (req, res) => {
  const judge = req.judge;
  models.Judge.create(judge)
    .then(() => res.send('success'))
    .catch(() => res.send('Failed'));
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
    .then(() => res.send('success'))
    .then(err => res.send(err.message));
});

// C
app.post('/courtroom', validator.validateCourtroom, (req, res) => {
  const courtroom = req.courtroom;
  models.Courtroom.create(courtroom)
    .then(() => res.send('success'))
    .catch(() => res.send('Failed'));
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
    .then(() => res.send('success'))
    .then(err => res.send(err.message));
});

// C
app.post('/participent', validator.validateParticipent, (req, res) => {
  const participent = req.participent;
  models.Participent.create(participent)
    .then(() => res.send('success'))
    .catch(() => res.send('Failed'));
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
    .then(() => res.send('success'))
    .then(err => res.send(err.message));
});

// C
app.post('/case', validator.validateCase, (req, res) => {
  const newCase = req.case;
  models.Case.create(newCase)
    .then(() => res.send('success'))
    .catch(err => res.send(err.message));
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
    .then(() => res.send('success'))
    .then(err => res.send(err.message));
});
