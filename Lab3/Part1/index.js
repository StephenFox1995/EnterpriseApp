const express = require('express');
const bodyParser = require('body-parser');
require('./connection')('postgres://@localhost:5432/auth');
const models = require('./models')();
const Validator = require('./validator');
const auth = require('./auth');

const app = express();
const validator = new Validator();

app.use(bodyParser.json());
app.listen(3000, () => console.log('Listening on port 3000!'));
app.all('/court/*', auth.guardEndpoint)

const response = (status, message, data=undefined) => {
  return { status, message, data };
}


// Authentication
app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const insert = "INSERT INTO users (email, password, username) VALUES \
    (:email, crypt(:password, gen_salt('bf', 8)), :username);";
  models.sequelize.query(insert, { replacements: { email, password, username } }).then(() => {
    res.send(response("Sucess", "Successfully registered"))
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT * FROM users WHERE email = lower(:email) AND \
    password = crypt(:password, password);';
  models.sequelize.query(query, { replacements: { email, password } })
    .then((result) => {
      if (result[0].length == 0) {
        res.send(response('Failed', 'Incorrect password or email'))
      } else {
        const token = auth.generateToken(result[0][0])
        res.send(response('Sucess', 'Successful Authentication', {
          'token': token
        }))
      }
    })
    .catch(() => {
      res
        .status(401)
        .json(response('Failed', 'Incorrect password or email'))
    });
});


// Judge
// C
app.post('/court/judge', validator.validateJudge, (req, res) => {
  const judge = req.judge;
  models.Judge.create(judge)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/court/judge/:id', (req, res) => {
  const id = req.params.id;
  models.Judge.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.put('/court/judge/:id', validator.validateJudge, (req, res) => {
  const id = req.params.id;
  const judge = req.judge;
  models.Judge.update(judge, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/court/judge/:id', (req, res) => {
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
app.post('/court/courtroom', validator.validateCourtroom, (req, res) => {
  const courtroom = req.courtroom;
  models.Courtroom.create(courtroom)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/court/courtroom/:id', (req, res) => {
  const id = req.params.id;
  models.Courtroom.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.put('/court/courtroom/:id', validator.validateCourtroom, (req, res) => {
  const id = req.params.id;
  const courtroom = req.courtroom;
  models.Courtroom.update(courtroom, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/court/courtroom/:id', (req, res) => {
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
app.post('/court/participent', validator.validateParticipent, (req, res) => {
  const participent = req.participent;
  models.Participent.create(participent)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/court/participent/:id', (req, res) => {
  const id = req.params.id;
  models.Participent.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.put('/court/participent/:id', validator.validateParticipent, (req, res) => {
  const id = req.params.id;
  const participent = req.participent;
  models.Participent.update(participent, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/court/participent/:id', (req, res) => {
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
app.post('/court/case', validator.validateCase, (req, res) => {
  const newCase = req.case;
  models.Case.create(newCase)
    .then(() => res.send(response('success', 'inserted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});
// R
app.get('/court/case/:id', (req, res) => {
  const id = req.params.id;
  models.Case.findAll({ where: { id } }).then(data => res.send(data));
});
// U
app.put('/court/case/:id', validator.validateCase, (req, res) => {
  const id = req.params.id;
  const updatedCase = req.case;
  models.Case.update(updatedCase, { where: { id } })
    .then(() => res.send(response('success', 'updated successfully')))
    .catch(err => res.send(response('failed', err.message)));
});
// D
app.delete('/court/case/:id', (req, res) => {
  const id = req.params.id;
  models.Case.destroy({ where: { id } })
    .then(() => res.send(response('success', 'deleted successfully')))
    .catch(() => res.send(response('failed', 'an error occurred')));
});