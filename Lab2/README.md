## Enterprise Application Development Lab 2

### Part 1
Show, using your badly implemented approach, 
how an attacker can craft a query string 
to allow the dropping of the products table.

The following code is vulnerable to SQL Injection:
<pre><code>
app.get('/products/hack', (req, res) => {
    const title = req.query.title;
    db.run(`select * from products where title = ${title}`;, (err, result) => res.send(result));
});
</pre></code>

This code allows the following HTTP request to drop the `products` table.

![screenshot](/Lab2/assets/hack.png)

`products` table before request

![screenshot](/Lab2/assets/beforehack.png)

and after the SQL Injection looked the following.

