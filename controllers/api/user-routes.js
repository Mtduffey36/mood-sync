const router = require('express').Router();
const { User } = require('../../models');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res) => {
  res.render('signup', { layout: 'main' });
 });

router.post('/signup', [
body('username').trim().isLength({min: 3}).withMessage('Username must be at least 3 characters long'),
body('email').trim().isEmail().withMessage('Must be a valid email address'),
body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
body('phone_number').isMobilePhone().withMessage('Must be a valid phone number'),
], async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()});
        }
        const existingUser = await User.findOne({
          where: {
            [Op.or]: [
              {username: req.body.username},
              {email: req.body.email},
              {phone_number: req.body.phone_number}
            ]
          }
        });
        if(existingUser){
          return res.status(400).json({message: 'Username, email or phone number already in use'});
        }
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone_number: req.body.phone_number,
        });
        const userResponse = dbUserData.toJSON();
        delete userResponse.password;
        res.status(201).json({
          message: 'User created successfully',
          user: userResponse
        });
        
    } catch (err) {
        console.error('Error in user creation:', err);
        res.status(500).json({ error: err.message });
    }
});

  router.get('/', (req, res) => {
    res.render('login');
    
    });

    router.post('/', async (req, res) => { 
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
    
        // Use req.session.save() to ensure the session is saved before sending the response
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
    });

  

module.exports = router;
