const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { Sequelize, Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
router.get('/signup', (req, res) => {
  res.render('signup', {
      layout: 'main',
      currentPath: req.path
  });
});
router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'main',
    currentPath: req.path
});
});
router.post('/signup', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').trim().isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phone_number').isMobilePhone().withMessage('Must be a valid phone number'),
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Normalize inputs
    const username = req.body.username.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;
    const phone_number = req.body.phone_number.trim();
    // Check for existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('username')), username),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), email),
          { phone_number: phone_number }
        ]
      }
    });
    //Handling errors if user exist
    if (existingUser) {
      console.log('Existing user found:', existingUser.toJSON());
      if (existingUser.username.toLowerCase() === username) {
        return res.status(400).json({ message: 'Username is already in use' });
      }
      if (existingUser.email.toLowerCase() === email) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      if (existingUser.phone_number === phone_number) {
        return res.status(400).json({ message: 'Phone number is already in use' });
      }
    }
    // If user does not exists create user
    const newUser = await User.create({
      username,
      email,
      password,
      phone_number,
    });
    console.log('New user created:', newUser.toJSON());
    const userResponse = newUser.toJSON();
    // Set up session so I can get the user ID after signup and make the journalEntries
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: 'An error occurred during signup' });
      }
      req.session.user_id = newUser.id;
      req.session.userEmail = newUser.email;
      req.session.loggedIn = true;
      console.log('Signup successful for user:', username);
      console.log('Email:')
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: userResponse,
        redirectUrl: '/dashboard'
      });
    });
  } catch (err) {
    console.error('Error in user creation:', err);
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: `${err.errors[0].path} is already in use` });
    }
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);
    req.session.userEmail = User.email;
    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    const dbUserData = await User.findOne({ where: { username } });
    if (!dbUserData) {
      console.log('No user found with username:', username);
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }
    console.log('User found:', dbUserData.username);
    console.log('Stored hashed password:', dbUserData.password);
    console.log('Provided login password:', password);
    const validPassword = await dbUserData.checkPassword(password);
    console.log('Password comparison result:', validPassword);
    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    }
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: 'An error occurred during login' });
      }
      req.session.user_id = dbUserData.id;
      req.session.userEmail = dbUserData.email;
      req.session.loggedIn = true;
      console.log('Login successful for user:', username);
      res.json({ success: true, message: 'You are now logged in!', redirectUrl: '/dashboard' });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'An error occurred during login', error: err.message });
  }
});
//Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});
//email route
router.get('/dashboard/send-email', (req, res) => {
  res.render('dashboard', {
      layout: 'main',
      currentPath: req.path
  });
});
module.exports = router;








