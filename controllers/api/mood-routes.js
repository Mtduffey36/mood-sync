const router = require('express').Router();
const {Mood } = require('../../models');
const Mainmood = require('../../models/MainMood');


//Getting dashboard to show the mood main and mood sub-categories
router.get('/dashboard', async (req, res) => {
  if (req.session.loggedIn === true) {
    try {
      console.log('Fetching main moods...');
      const mainMoods = await Mainmood.findAll({
        attributes: ['id', 'main_mood_name'],
        include: [{
          model: Mood, 
          as: 'submoods',
          attributes: ['id', 'mood_name']
        }],
        order:[
          ['main_mood_name', 'ASC'],
          [{model: Mood, as: 'submoods'}, 'mood_name', 'ASC']
        ]
      });

      // Convert the Sequelize instances to plain objects
      const plainMainMoods = mainMoods.map(mood => mood.get({ plain: true }));

      // Render the dashboard view with the fetched main moods
      res.render('dashboard', {
        layout: 'main',
        currentPath: req.path,
        mainMoods: plainMainMoods
      });
    } catch (err) {
      console.error('Error fetching main moods:', err);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching dashboard data.',
        error: err.message
      });
    }
  } else {
    // Redirect to login if not logged in
    res.redirect('/login');
  }
});


  module.exports = router;