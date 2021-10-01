const express = require('express');
const db = require('../db');

const app = express();
const PORT = 3001;

app.get('/products', (req, res) => {
  const { page } = req.query;
  const { count } = req.query;
  if (count > 1000) {
    res.sendStatus(422);
  }
  db.getProducts(count, page)
    .then((result) => { res.json(result); })
    .catch((error) => {
      console.log('error getting products', error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
