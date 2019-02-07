const express = require('express');

const router = express.Router();

/* const { Client } = require('pg'); */

const { eyda, select, parse } = require('./db');

/* const connectionString = process.env.DATABASE_URL; */

/* const client = new Client({
  connectionString,
}); */


/* function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
} */


router.get('/applications', async (req, res) => {
  try {
    const umsoknir = await select();
    const title = 'Listi af umsóknum';
    res.render('umsoknir', { title, listi: umsoknir.rows });
  } catch (err) {
    throw err;
  }
});

router.post('/applications/delete/:id', async (req, res) => {
  const takki = req.params.id;
  try {
    await eyda(takki);
  } catch (e) {
    console.error('Gat ekki eytt umsókn!', e);
    throw e;
  }
  res.redirect('/applications');
});

router.post('/applications/parse/:id', async (req, res) => {
  const takki = req.params.id;
  try {
    await parse(takki);
  } catch (e) {
    console.error('Gat ekki eytt unnið umsókn!', e);
    throw e;
  }
  res.redirect('/applications');
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


/* router.post('/applications'); */

module.exports = router;
