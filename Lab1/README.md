## Enterprise Application Development Lab 1

### `GET /users List all users`
Sample output

`curl -X GET http://localhost:3000/users | python -m json.tool`

![Screenshot](/assets/users.png)

---

### `GET /users/:id Show details of the specified user`
Sample output

`curl -X GET http://localhost:3000/users/2 | python -m json.tool`

![Screenshot](/assets/usersid.png)

---

### `GET /products List all products`
Sample output

`curl -X GET http://localhost:3000/products | python -m json.tool`

![Screenshot](/assets/products.png)

---

### `GET /products/:id Show details of the specified products`
Sample output

`curl -X GET http://localhost:3000/products/3 | python -m json.tool`

![Screenshot](/assets/productsid.png)

---

### `GET /purchases List all purchases`
Sample output

`curl -X GET http://localhost:3000/purchases | python -m json.tool`

![Screenshot](/assets/purchases.png)

---

### `GET /purchases/:id Show details of the specified purchases`
Sample output

`curl -X GET http://localhost:3000/purchases/10 | python -m json.tool`

![Screenshot](/assets/purchasesid.png)