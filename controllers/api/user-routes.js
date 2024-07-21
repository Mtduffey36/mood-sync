const router = require('express').Router();
const { User } = require('../../models');

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

router.get('/', async (req,res) => {

});

router.post('/login', async (req,res) => {
   try{
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required'});
    }
    const dbUserData = await User.findOne({ where: {username}});
    
    if(!dbUserData){
        return res.status(400).json({ message: 'Incorrect username or password'});
    }
    const vaildPassword = await dbUserData.checkPassword(password);

    if(!validPassword) {
        return res.status(400).json({message: 'Incorrect username or password'});
    }
        req.session.save(() => {
        req.session.userId = dbUserData.id;
        req.session.loggedIn = true;

        const { pasword: _, ...userWithoutPassword} = dbUserData.get({ plain: true});
        res.status(200).json({ user: userWithoutPassword, message: 'You are now logged in!'});
    });
   } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({message: 'An error occurred during login', error: err.message});
   }
});

module.exports = router;
