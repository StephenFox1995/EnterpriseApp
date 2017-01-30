var express = require('express'),
    massive = require('massive');

let app = express();
let db = massive.connectSync({db: 'pgguide'});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
  db.run('select * from users', function (err, results) {
    console.log(results);
    res.send(results);
  });
});
app.get('/users/:id', function (req, res) {
  let id = req.params.id;
  db.users.find({"id": id}, function(err, result) {
    res.send(result);
  })
});

app.get('/products', function (req, res) {
  db.run('select * from products', function (err, result) {
    res.send(result);
  });
});
app.get('/products/:id', function (req, res) {
  let id = req.params.id;
  db.products.find({"id": id}, function(err, result) {
    res.send(result);
  })
});

app.get('/purchases', function (req, res) {
  db.run('select * from purchases', function (err, result) {
    res.send(result);
  });
});
app.get('/purchases/:id', function (req, res) {
  let id = req.params.id;
  db.purchases.find({"id": id}, function(err, result) {
    res.send(result);
  })
});
