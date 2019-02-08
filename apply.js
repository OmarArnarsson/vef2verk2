const xss = require('xss');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const { insert } = require('./db');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('netfang').isLength({ min: 1 }).withMessage('Tölvupóstfang má ekki vera tómt'),
  check('netfang').isEmail().withMessage('Netfang þarf að vera á forminu siggi@siggi.is'),
  check('simi').isLength({ min: 7 }).withMessage('Símanúmer þarf að vera 7 stafir'),
  check('simi').isLength({ max: 8 }).withMessage('Símanúmer þarf að vera 7 stafir'),
  check('texti').isLength({ min: 100 }).withMessage('Kynning þarf að vera allavega 100 stafir'),
];

const sanitazion = [
  sanitize('name')
    .trim()
    .escape(),
  sanitize('netfang')
    .normalizeEmail(),
  sanitize('simi')
    .blacklist('-')
    .blacklist(' ')
    .toInt(),
];

function form(req, res) {
  const data = {};
  const title = 'Umsókn';
  res.render('index', {
    title, data, errors: [],
  });
}

async function apply(req, res) {
  const {
    body: {
      name = '', netfang = '', simi = '', texti = '', starf = '',
    } = {},
  } = req;

  const data = {
    name: xss(name),
    netfang: xss(netfang),
    simi: xss(simi),
    texti: xss(texti),
    starf: xss(starf),
  };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array();
    const title = 'No bueno';
    res.render('index',
      {
        title, data, errors: errorMessages,
      });
  } else {
    try {
      await insert(name, netfang, simi, texti, starf);
    } catch (e) {
      console.error('Gat ekki búið til umsókn fyrir:', name, e);
      throw e;
    }
    const title = 'Þakka þér';
    res.render('takk', { title });
  }
}

router.get('/', form);
router.post('/apply', validation, sanitazion, catchErrors(apply));

module.exports = router;
