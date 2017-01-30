const express = require('express');
const massive = require('massive');

const app = express();
const db = massive.connectSync({ db: 'pgguide' });


app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.get('/users', (req, res) => {
  db.run('select * from users', (err, results) => {
    res.send(results);
  });
});
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  db.users.find({ id: id }, (err, result) => {
    res.send(result);
  });
});

app.get('/products', (req, res) => {
  db.run('select * from products', (err, result) => {
    res.send(result);
  });
});
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  db.products.find({ id: id }, (err, result) => {
    res.send(result);
  });
});

app.get('/purchases', (req, res) => {
  db.run('select * from purchases', (err, result) => {
    res.send(result);
  });
});
app.get('/purchases/:id', (req, res) => {
  const id = req.params.id;
  db.purchases.find({ "id": id }, (err, result) => {
    res.send(result);
  });
});
