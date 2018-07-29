# Backend

[![Build Status](https://travis-ci.com/yitomok/9e77f6ce-a3cc-46fe-83c6-8eab8c6ba547.svg?branch=backend-lv-2)](https://travis-ci.com/yitomok/9e77f6ce-a3cc-46fe-83c6-8eab8c6ba547)

Backend

## Installation
Install the dependencies and devDependencies and start the server.
```
npm install
npm start
```

For production environment:
```
npm install --production
NODE_ENV=production npm start
```

### Environment Variables

| Name | Default | Usage |
| ------ | ------ | ------ |
| DB_URI | `mongodb://localhost:27017/backend-bg` | MongoDB URI |
| NODE_ENV |  | Set `production` in production environment and `test` for mocha test cases |
| ORDERS_COLLECTION | `orders` | MongoDB Collection name |
| CUSTOMERS_COLLECTION | `customers` | MongoDB Collection name |
| PORT |  | API exposed at this port |

## API Specification

[Here](API.md)
