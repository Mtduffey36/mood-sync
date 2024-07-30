const router = require('express').Router();
const { JournalEntries, Mainmood, Mood } = require('../../models');


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


//HeatMap Route
router.get('/moodData', async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const user_id = req.session.user_id;
    if (!user_id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const journalEntries = await JournalEntries.findAll({
      where: { user_id },
      attributes: ['createdAt'],
      include: [{
        model: Mood,
        attributes: ['mood_main_id']
      }]
    });

    console.log("Raw Journal Entries:", JSON.stringify(journalEntries, null, 2));

    const data = journalEntries.reduce((accumulator, entry) => {
      const formattedTime = Math.floor(new Date(entry.createdAt).getTime() / 1000);
      const moodMainId = entry.mood ? entry.mood.mood_main_id : 0;

      console.log("Processing entry:", {
        createdAt: entry.createdAt,
        moodMainId
      });

      accumulator[formattedTime] = moodMainId;

      return accumulator;
    }, {});

    res.json(data);
    console.log("Processed data:", data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the mood data.' });
  }
});

  module.exports = router;