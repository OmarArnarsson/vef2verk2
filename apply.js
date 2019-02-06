const express = require('express');
const { check, validationResult } = require('express-validator/check');

const { insert } = require('./db');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('email').isLength({ min: 1 }).withMessage('Tölvupóstfang má ekki vera tómt'),
  check('phone').isLength({ min: 7, max: 8 }).withMessage('Símanúmer þarf að vera 7 stafir'),
  check('intro').isLength({ min: 100 }).withMessage('Kynning þarf að vera allavega 100 stafir'),
];

const sanitazion = [

];

function form(req, res) {
  res.render('index', { name: '', email: '', phone: '', intro: '', errors: [] });
}

async function apply(req, res) {
  const { body: { name, email, phone, intro } = {} } = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array();
    res.render('index', { name, errors: errorMessages });
  } else {
    try {
      await insert(name, email, phone, intro);
    } catch (e) {
      console.error('Gat ekki búið til umsókn fyrir:', name, e);
      throw e;
    }
    res.render('takk');
  }
}

router.get('/', catchErrors(form));
router.post('/apply', validation, sanitazion, catchErrors(apply));

module.exports = router;
