const express = require('express');
const mariadb = require('mariadb');
const secret = require('./secret').keys;

const app = express();
const port = 3000;

const pool = mariadb.createPool(secret.db_config);

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM charm_db.test_table;');
  res.json(result);
});

app.listen(port, () => {
  console.log(`Test app listening on port ${port}`);
});