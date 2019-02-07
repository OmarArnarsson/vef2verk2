const express = require('express');

const router = express.Router();

const { Client } = require('pg');

/* const { eyda } = require('./db'); */

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
});


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

router.get('/applications', async (req, res, next) => {
  try {
    client.connect();
    const umsoknir = await client.query('SELECT * FROM applications ORDER BY id');
    const title = 'Listi af umsóknum';
    res.render('umsoknir', { title, listi: umsoknir.rows });
  } catch (err) {
    throw err;
  }
});

/* async function applications(req, res) {
  const{ };
  try {
    await eyda(id);
  } catch (e) {
    console.error('Gat ekki eytt umsókn:', name, e);
    throw e;
  }
  router.get('/applications', async (req, res, next) => {
    try {
      client.connect();
      const umsoknir = await client.query('SELECT * FROM applications ORDER BY id');
      const title = 'Listi af umsóknum';
      res.render('umsoknir', { title, listi: umsoknir.rows });
    } catch (err) {
      throw err;
    }
  });
} */

router.get('/apply');
router.post('/applications');

module.exports = router;
