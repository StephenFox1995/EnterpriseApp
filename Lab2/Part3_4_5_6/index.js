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

// C
app.post('/case', validator.validateCase, (req, res) => {
  const _case = req.case;
  models.Participent.create(_case)
    .then(() => res.send('success'))
    .catch(() => res.send('Failed'));
});
// R
app.get('/case/:id', (req, res) => {
  const id = req.params.id;
  models.Participent.findAll({ where: { id } }).then(data => res.send(data));
});
