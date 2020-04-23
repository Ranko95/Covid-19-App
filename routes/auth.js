const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { sessionChecker } = require('../middleware/auth');

const saltRounds = 10;

router
  .route('/signup')
  .get((req, res, next) => {
    try {
      res.render('signup');
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userCheck = await User.findOne({ email });
      if (userCheck) {
        res.send('Email already in use');
      } else {
        const user = await User.create({
          name,
          email,
          password: await bcrypt.hash(password, saltRounds),
        });
        req.session.user = user;
        res.redirect('/');
      }
    } catch (error) {
      next(error);
    }
  });

router
  .route('/login')
  .get((req, res, next) => {
    try {
      res.render('login');
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isEqual = await bcrypt.compare(password, user.password);
      if (isEqual) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.send('Wrong email or password');
      }
    } else {
      res.send('Wrong email or password');
    }
  });

router.get('/logout', sessionChecker, (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
