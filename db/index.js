const { Pool } = require('pg');

const pool = new Pool({
  user: 'spoyla',
  host: 'localhost',
  database: 'sdc',
  password: 'hackreactor',
  port: 5432,
});

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

const getProducts = (count = 5, page = 1) => (
  pool.query(products(count, page))
);

module.exports = { getProducts };
