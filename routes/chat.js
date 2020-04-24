const router = require('express').Router();
const { sessionChecker } = require('../middleware/auth');

router
  .route('/')
  .get(sessionChecker, (req, res, next) => {
    try {
      res.render('chat');
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
