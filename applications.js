const express = require('express');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/*function forsida(req, res) {
  const title = 'Umsókn';
  res.render('index', { title });
}

router.get('/', catchErrors(forsida));*/

module.exports = router;
