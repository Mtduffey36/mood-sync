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

router.get('/moodData', async(req, res) => {
  try{
    const moodData = await Mood.findAll({
      attributes: [
        'id', 'mood_name', 'mood_score', 'createdAt', 'mood_main_id'
      ],
      include: [{
        model: Mainmood,  
        attributes: ["main_mood_name"],
        as:"mainmood"
      }]
    });

    const data = moodData.reduce((accumulator, currentValue) => {
      const formattedTime = Math.floor(new Date(currentValue.createdAt).getTime() / 1000)
      console.log("formatted unix time i hope", formattedTime)

      const moodMainId = currentValue.mood_main_id;
      console.log("this is main mood i hope", moodMainId)

      if(!accumulator[formattedTime]) {
        accumulator[formattedTime] = 0;
      }

      // accumulator[moodMainId][formattedTime] = (accumulator[moodMainId][formattedTime] || 0) + 1;
      accumulator[formattedTime] += 1;

      return accumulator;
    }, {})

    res.json(data)
    console.log("pls work data", data)
  } catch(err) {
    console.log(err);
  } 
});


  module.exports = router;