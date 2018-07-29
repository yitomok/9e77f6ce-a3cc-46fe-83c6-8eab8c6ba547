**API Specification**
----

* **[Get Orders By Name](#get-orders-by-name)**
* **[Get Orders By Address](#get-orders-by-address)**
* **[Create Order](#create-order)**
* **[Update Order](#update-order)**
* **[Delete Order](#delete-order)**
* **[Get Order Count Grouped By Items](#get-order-count-grouped-by-items)**
* **[Get Customer Info](#get-customer-info)**
* **[Update Customer Info](#update-customer-info)**
* **[Delete Customer Info](#delete-customer-info)**
* **[Get Customer Orders](#get-customer-orders)**
* **[Get Customer Spent](#get-customer-spent)**
* **[Get Customers By Item](#get-customers-by-item)**

**Get Orders By Name**
----
  Get orders by customer name.

* **URL**

  `/orders/query/name`

* **Method:**

  `POST`

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `by=[string]`, customer name

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[{ "_id": "5b5e3317eb34272ffca83bd2", "orderId": "001", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Macbook", "price": 1700, "currency": "EUR" }]`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "invalid" }` <br />
    **Reason:** Mandatory fields missing.

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Orders By Address**

  Get orders by customer address.

* **URL**

  `/orders/query/name`

* **Method:**

  `POST`

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `by=[string]`, customer address

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[{ "_id": "5b5e3317eb34272ffca83bd2", "orderId": "001", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Macbook", "price": 1700, "currency": "EUR" }]`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ "message" : "invalid" }` <br />
    **Reason:** Mandatory fields missing.

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Create Order**
----
  Create a new order.

* **URL**

  `/orders`

* **Method:**

  `POST`

*  **URL Params**

   * None

* **Data Params**

   * **Mandatory:**
     * `orderId=[string]`, unique order id
     * `name=[string]`, customer full name
     * `address=[string]`, customer address
     * `item=[string]`, item name
     * `price=[number]`, order amount
     * `currency=[string]`, 3-character currency

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "_id": "5b5e3317eb34272ffca83bd2", "orderId": "001", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Macbook", "price": 1700, "currency": "EUR" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Update Order**
----
  Update an existing order.

* **URL**

  `/orders/:id`

* **Method:**

  `PUT`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique order id

* **Data Params**

   * **Mandatory:**
     * `orderId=[string]`, unique order id
     * `name=[string]`, customer full name
     * `address=[string]`, customer address
     * `item=[string]`, item name
     * `price=[number]`, order amount
     * `currency=[string]`, 3-character currency

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "_id": "5b5e3317eb34272ffca83bd2", "orderId": "001", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Macbook", "price": 1600, "currency": "EUR" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Delete Order**
----
  Delete an existing order.

* **URL**

  `/orders/:id`

* **Method:**

  `DELETE`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique order id

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "orderId": "001", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Macbook", "price": 1700, "currency": "EUR" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Order Count Grouped By Items**
----
  Get order count grouped By item name.

* **URL**

  `/orders/count`

* **Method:**

  `GET`

*  **URL Params**

   * None

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "item": "Macbook", "n": 1 }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Customer Info**
----
  Get an existing customer.

* **URL**

  `/customer/:id`

* **Method:**

  `GET`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique customer id

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "_id": "5b60bb0463fe5972b08c88eb", "customerId": "001", "name": "Peter Lustig", "address": "Steindamm 80" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Update Customer Info**
----
  Update an existing customer.

* **URL**

  `/customer/:id`

* **Method:**

  `PUT`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique customer id

* **Data Params**

   * **Mandatory:**
     * `customerId=[string]`, unique customer id
     * `name=[string]`, customer full name
     * `address=[string]`, customer address

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "_id": "5b60bb0463fe5972b08c88eb", "customerId": "001", "name": "Peter Lustig", "address": "Steindamm 79" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Delete Customer Info**
----
  Delete an existing customer.

* **URL**

  `/customers/:id`

* **Method:**

  `DELETE`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique customer id

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ "customerId": "001", "name": "Peter Lustig", "address": "Steindamm 80" }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Customer Orders**
----
  Get all orders for an existing customer.

* **URL**

  `/customer/:id/orders`

* **Method:**

  `GET`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique customer id

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[ { "_id": "5b37c713fb6fc03328f7261c", "orderId": "004", "name": "Peter Lustig", "address": "Steindamm 80", "item": "Book \"Cooking 101\"", "price": 10, "currency": "EUR" } ]`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Customer Spent**
----
  Get total amount spent for an existing customer.

* **URL**

  `/customer/:id/spent`

* **Method:**

  `GET`

*  **URL Params**

   * **Mandatory:**
     * `id=[string]`, unique customer id

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[ { "amount": 160, "currency": "EUR" } ]`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.


**Get Customers By Item**
----
  Get all customers ordered an item.

* **URL**

  `/customer/orders?item=:item`

* **Method:**

  `GET`

*  **URL Params**

   * **Mandatory:**
     * `item=[string]`, item name

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[ { "_id": "5b60bb0463fe5972b08c88eb", "customerId": "001", "name": "Peter Lustig", "address": "Steindamm 80" } ]`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "message" : "error" }` <br />
    **Reason:** Something gone wrong, contact the developer.
