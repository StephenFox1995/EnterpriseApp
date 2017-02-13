const express = require('express');
const massive = require('massive');

const app = express();
const db = massive.connectSync({ db: 'pgguide' });
app.listen(3000, () => console.log('Listening on port 3000!'));


// Vulnerable to SQL Injection.
app.get('/products/hack', (req, res) => {
  const title = req.query.title;
  db.run(`select * from products where title = ${title};`, (err, result) => res.send(result));
});
// Parameterised query to fix vulnerability.
app.get('/products/safe1', (req, res) => {
  const title = req.query.title;
  db.run('select * from products where title = $1;', [title], (err, result) => res.send(result));
});
// Stored function to fix vulnerability.
app.get('/products/safe2', (req, res) => {
  const title = req.query.title;
  db.get_products([title], (error, result) => {
    res.send(result);
  });
});
