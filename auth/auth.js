middleware/auth.js
const User = require('../models/User');

const isLoggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isLoggedOut = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    res.redirect('/dashboard');
  }
};

const loadUser = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        req.user = user;
        res.locals.user = user;
      }
    } catch (err) {
      console.error('Error loading user:', err);
    }
  }
  next();
};

module.exports = { isLoggedIn, isLoggedOut, loadUser };