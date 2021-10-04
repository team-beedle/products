const { Pool } = require('pg');

const pool = new Pool({
  user: 'spoyla',
  host: 'localhost',
  database: 'sdc',
  password: 'hackreactor',
  port: 5432,
});

const features = (productId) => (
  {
    name: 'returns features for product',
    text: `
    SELECT feature, value FROM features WHERE product_id = $1
    `,
    values: [productId],
  }
);

const photos = (styleId) => (
  {
    name: 'returns-photos',
    text: `
    SELECT thumbnail_url, url from photos WHERE style_id = $1
    ORDER BY id
    `,
    values: [styleId],
  }
);

const product = (id) => (
  {
    name: 'returns-individual-product',
    text: `
    SELECT * FROM product WHERE id = $1
    ORDER BY id
    `,
    values: [id],
  }
);

const products = (count, page) => (
  {
    name: 'returns-product-list',
    text: `
    SELECT * FROM product
    ORDER BY id
    OFFSET (($1 - 1) * $2) ROWS
    FETCH NEXT $2 ROWS ONLY
    `,
    values: [page, count],
  }
);

const related = (productId) => (
  {
    name: 'returns-related-times',
    text: `
    SELECT ARRAY_AGG(related_id) FROM related_items WHERE product_id = $1
    `,
    values: [productId],
  }
);

const skus = (styleId) => (
  {
    name: 'returns-sku-list',
    text: `
    SELECT id, size, quantity  FROM skus WHERE style_id = $1
    ORDER BY id
    `,
    values: [styleId],
  }
);

const styles = (productId) => (
  {
    name: 'returns-styles',
    text: `
    SELECT style_id, name, original_price, sale_price, default_style FROM style WHERE product_id = $1
    ORDER BY style_id
    `,
    values: [productId],
  }
);

const getFeatures = (productId) => (
  pool.query(features(productId))
);

const getPhotos = (styleId) => (
  pool.query(photos(styleId))
);

const getProduct = (id) => (
  pool.query(product(id))
);

const getProducts = (count = 5, page = 1) => (
  pool.query(products(count, page))
);

const getRelated = (productId) => (
  pool.query(related(productId))
);

const getSkus = (styleId) => (
  pool.query(skus(styleId))
);

const getStyles = (productId) => (
  pool.query(styles(productId))
);

module.exports = {
  getProducts,
  getProduct,
  getFeatures,
  getRelated,
  getStyles,
  getSkus,
  getPhotos,
};
