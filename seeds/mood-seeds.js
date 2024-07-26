const sequelize = require('../config/connection');
const { Mood, Mainmood } = require('../models');

const moodData = [
  // Happy
  { mood_name: 'Joyful', mood_score: 3, mood_main_id: 1 },
  { mood_name: 'Content', mood_score: 2, mood_main_id: 1 },
  { mood_name: 'Excited', mood_score: 3, mood_main_id: 1 },

  // Sad
  { mood_name: 'Depressed', mood_score: -5, mood_main_id: 2 },
  { mood_name: 'Down', mood_score: -4, mood_main_id: 2 },
  { mood_name: 'Lonely', mood_score: -4, mood_main_id: 2 },
  { mood_name: 'Disappointed', mood_score: -3, mood_main_id: 2 },

  // Angry
  { mood_name: 'Irritated', mood_score: -3, mood_main_id: 3 },
  { mood_name: 'Frustrated', mood_score: -4, mood_main_id: 3 },
  { mood_name: 'Hostile', mood_score: -4, mood_main_id: 3 },
  { mood_name: 'Resentful', mood_score: -4, mood_main_id: 3 },

  // Anxious
  { mood_name: 'Nervous', mood_score: -3, mood_main_id: 4 },
  { mood_name: 'Worried', mood_score: -4, mood_main_id: 4 },
  { mood_name: 'Fearful', mood_score: -4, mood_main_id: 4 },
  { mood_name: 'Stressed', mood_score: -5, mood_main_id: 4 },

  // Calm
  { mood_name: 'Relaxed', mood_score: 2, mood_main_id: 5 },
  { mood_name: 'Peaceful', mood_score: 3, mood_main_id: 5 },
  { mood_name: 'Content', mood_score: 2, mood_main_id: 5 },
  { mood_name: 'Serene', mood_score: 3, mood_main_id: 5 },

  // None
  { mood_name: 'Emotionless', mood_score: -1, mood_main_id: 6 },
];

const seedMoods = async () => {
  await sequelize.sync({ force: false });

  // First, ensure that Mainmood data is seeded
  await Mainmood.bulkCreate([
    { main_mood_name: 'Happy' },
    { main_mood_name: 'Sad' },
    { main_mood_name: 'Angry' },
    { main_mood_name: 'Anxious' },
    { main_mood_name: 'Calm' },
    { main_mood_name: 'None' }
  ]);

  // Then, seed the Mood data
  await Mood.bulkCreate(moodData);

  console.log('Mood data seeded successfully');
  process.exit(0);
};

seedMoods();