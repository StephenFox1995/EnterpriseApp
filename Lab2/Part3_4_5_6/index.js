const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./connection')('postgres://@localhost:5432/test');
const models = require('./models')();
const Validator = require('./validator');



const app = express();
const validator = new Validator();
app.use(bodyParser.json());
app.listen(3000, () => console.log('Listening on port 3000!'));



// returns all participents
app.get('/participent/:id', (req, res) => {
  const id = req.params.id;
  models.Participent.findAll({ where: { id } }).then(data => res.send(data));
});
app.post('/participent', validator.validateParticipent, (req, res) => {
  const participent = req.participent;
  models.Participent.create(participent)
    .then(() => res.send('success'))
    .catch(() => res.send('Failed'));
});
