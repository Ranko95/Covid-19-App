const router = require('express').Router();
const {
  sessionChecker,
} = require('../middleware/auth');

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
