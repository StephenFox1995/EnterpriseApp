## Enterprise Application Development Lab 2

### Part 1
Show, using your badly implemented approach, 
how an attacker can craft a query string 
to allow the dropping of the products table.

The following code is vulnerable to SQL Injection:
```javascript
app.get('/products/hack', (req, res) => {
    const title = req.query.title;
    db.run(`select * from products where title = ${title}`;, (err, result) => res.send(result));
});
```

This code allows the following HTTP request to drop the `products` table.

![screenshot](/Lab2/assets/hack.png)

database before request:

![screenshot](/Lab2/assets/beforehack.png)

database after before request:

![screenshot](/Lab2/assets/afterhack.png)

The products table was dropped.

To fix this vulnerability, one can use:
#### parameterised queries
```javascript 
// Parameterised query to fix vulnerability.
app.get('/products/safe1', (req, res) => {
  const title = req.query.title;
  db.run('select * from products where title = $1;', [title], (err, result) => res.send(result));
});
```

#### or a stored functions
```javascript
app.get('/products/safe2', (req, res) => {
  const title = req.query.title;
  db.get_products([title], (error, result) => {
    res.send(result);
  });
});
```

The syntax for the stored function is as follows:
```sql
create or replace function get_products(t character varying)
returns setof products
AS 
$$
    select * from products where title = t;
$$
language sql
```