const sequelize = require('../config/connection');
const Mainmood = require('../models/MainMood');

const mainmoodData = [
  { main_mood_name: 'Happy' },
  { main_mood_name: 'Sad' },
  { main_mood_name: 'Angry' },
  { main_mood_name: 'Anxious' },
  { main_mood_name: 'Calm' },
  { main_mood_name: 'None' }
];

const seedMainmood = async () => {
  await sequelize.sync({ force: true }); // This will drop the table if it already exists and create a new one
  await Mainmood.bulkCreate(mainmoodData);
  console.log('Mainmood data seeded successfully');
  process.exit(0);
};

seedMainmood();