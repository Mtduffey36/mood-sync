const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');


router.post('/signup', async (req,res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.email,
            phone_number: req.body.phone_number,
        })
        res.status(201).json(dbUserData);
    } catch (err) {
        console.error('Error in user creation:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async(req, res) => {
    try{
      const dbUserData = await User.findAll({
      });
      res.status(200).json(dbUserData);
    }catch (err){
      res.status(500).json(err);
    }
  
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log('Login attempt for username:', username);
      console.log('Provided password:', password);
  
      const user = await User.findOne({ where: { username } });
      
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'Incorrect username or password' });
      }
  
      console.log('Stored hashed password:', user.password);
  
      const isValid = await bcrypt.compare(password, user.password);
      console.log('Direct bcrypt compare result:', isValid);
  
      if (!isValid) {
        return res.status(400).json({ message: 'Incorrect username or password' });
      }
  
      // Login successful
      res.json({ message: 'You are now logged in!' });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'An error occurred during login' });
    }
  });
  

module.exports = router;
