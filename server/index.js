const express = require('express');
const bluebird = require('bluebird');
const db = require('../db');

const app = express();
const PORT = 3001;

app.get('/products', (req, res) => {
  const { page } = req.query;
  const { count } = req.query;
  if (count > 100) {
    res.sendStatus(422);
  }
  db.getProducts(count, page)
    .then((result) => (result.rows))
    .then((result) => (res.json(result)))
    .catch((error) => {
      console.log('getting product list', error);
      res.sendStatus(500);
    });
});

app.get('/products/:product_id', async (req, res) => {
  // eslint-disable-next-line camelcase
  const { product_id } = req.params;
  const productInfo = await db.getProduct(product_id)
    .then((result) => (result.rows[0]))
    .catch((error) => {
      console.log('getting product', error);
      res.sendStatus(500);
    });

  productInfo.features = await db.getFeatures(product_id)
    .then((result) => (result.rows))
    .catch((error) => {
      console.log('getting features', error);
      res.sendStatus(500);
    });
  res.json(productInfo);
});

app.get('/products/:product_id/styles', (req, res) => {
  // eslint-disable-next-line camelcase
  const { product_id } = req.params;
  const productStyles = { product_id };

  db.getStyles(product_id)
    .then((styles) => {
      productStyles.results = styles.rows;
      return productStyles;
    })
    .then((pStyles) => {
      const styles = pStyles.results;
      Promise.all(styles.map((style) => (
        db.getPhotos(style.style_id)
          .then((result) => (result.rows))
          .then((photos) => {
            style.photos = photos;
          })
          .then(() => (
            db.getSkus(style.style_id)
              .then((result) => (result.rows))
              .then((rows) => {
                style.skus = {};
                rows.forEach((row) => {
                  style.skus[row.id] = { quantity: row.quantity, size: row.size };
                });
              })
          ))
      )))
        .then(() => (res.json(productStyles)));
    });
});

app.get('/products/:product_id/related', (req, res) => {
  // eslint-disable-next-line camelcase
  const { product_id } = req.params;
  db.getRelated(product_id)
    .then((result) => (result.rows[0].array_agg))
    .then((items) => (res.json(items)))
    .catch((error) => {
      console.log('related items', error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
