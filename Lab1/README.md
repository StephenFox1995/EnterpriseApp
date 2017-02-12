## Enterprise Application Development Lab 1

## Database Schema
![Screenshot](/Lab1/assets/schema.png)

## ReST HTTP Endpoints.
### `GET /users List all users`
Sample output

`curl -X GET http://localhost:3000/users | python -m json.tool`

![Screenshot](/Lab1/assets/users.png)

---

### `GET /users/:id Show details of the specified user`
Sample output

`curl -X GET http://localhost:3000/users/2 | python -m json.tool`

![Screenshot](/Lab1/assets/usersid.png)

---

### `GET /products List all products`
Sample output

`curl -X GET http://localhost:3000/products | python -m json.tool`

![Screenshot](/Lab1/assets/products.png)

---

### `GET /products/:id Show details of the specified products`
Sample output

`curl -X GET http://localhost:3000/products/3 | python -m json.tool`

![Screenshot](/Lab1/assets/productsid.png)

---

### `GET /purchases List all purchases`
Sample output

`curl -X GET http://localhost:3000/purchases | python -m json.tool`

![Screenshot](/Lab1/assets/purchases.png)

---

### `GET /purchases/:id Show details of the specified purchases`
Sample output

`curl -X GET http://localhost:3000/purchases/10 | python -m json.tool`

![Screenshot](/Lab1/assets/purchasesid.png)