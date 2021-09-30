const { Pool } = require('pg');

const pool = new Pool({
  user: 'spoyla',
  host: 'localhost',
  database: 'sdc',
  password: 'hackreactor',
  port: 5432
})

const products = (count, page) => {
  return {
    name: 'returns-product-list',
    text: `
    SELECT * FROM product
    ORDER BY id
    OFFSET (($1 - 1) * $2) ROWS
    FETCH NEXT $2 ROWS ONLY
    `,
    values: [page, count]
  }
}

const getProducts = (count, page) => {
  count = count || 5;
  page = page || 1;
  return pool.query(products(count, page))
};

module.exports = {getProducts}