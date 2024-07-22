// authController.js
const { User } = require('../models');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const dbUserData = await User.findOne({ where: { username } });

    if (!dbUserData) {
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }

    const validPassword = await dbUserData.checkPassword(password);

    if (!validPassword) {
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }

    req.session.userId = dbUserData.id;
    req.session.loggedIn = true;

    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: 'An error occurred during login' });
      }
      res.json({ success: true, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'An error occurred during login', error: err.message });
  }
};

module.exports = { login };