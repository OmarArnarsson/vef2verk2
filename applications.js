const express = require('express');

const router = express.Router();

const { eyda, select, parse } = require('./db');

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

module.exports = router;
