CREATE TABLE IF NOT EXISTS product (
  id INT PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT 0,
  updated_at BIGINT NOT NULL DEFAULT 0
);

COPY product
FROM '/home/spoyla/HackReactor/sdc/sdcData/product.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS style (
  id INT PRIMARY KEY,
  productId INT REFERENCES product(id),
  name VARCHAR,
  sale_price INT,
  original_price INT,
  default_style BOOLEAN
);

COPY style
FROM '/home/spoyla/HackReactor/sdc/sdcData/styles.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS related_items (
  id INT PRIMARY KEY,
  product_id INT NOT NULL REFERENCES product(id),
  related_id INT NOT NULL
);

COPY related_items
FROM '/home/spoyla/HackReactor/sdc/sdcData/related.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS photos (
  id INT PRIMARY KEY,
  style_id INT NOT NULL REFERENCES style(id),
  thumbnail_url VARCHAR,
  url VARCHAR
);

COPY photos
FROM '/home/spoyla/HackReactor/sdc/sdcData/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS skus (
  id INT PRIMARY KEY,
  style_id INT NOT NULL REFERENCES style(id),
  size VARCHAR,
  quantity INT NOT NULL
);

COPY skus
FROM '/home/spoyla/HackReactor/sdc/sdcData/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS features (
  id INT PRIMARY KEY,
  product_id INT REFERENCES product(id),
  feature VARCHAR,
  value VARCHAR
);

COPY features
FROM '/home/spoyla/HackReactor/sdc/sdcData/features.csv'
DELIMITER ','
CSV HEADER;
