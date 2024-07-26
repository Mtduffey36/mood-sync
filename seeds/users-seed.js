const { User, Mood, JournalEntries, Mainmood } = require('../models');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create main mood entries
  const mainMoodData = [
    { main_mood_name: 'Happy' },
    { main_mood_name: 'Sad' },
    { main_mood_name: 'Angry' },
    { main_mood_name: 'Anxious' },
    { main_mood_name: 'Calm' },
    { main_mood_name: 'Neutral' }
  ];

  const mainMoods = await Mainmood.bulkCreate(mainMoodData);

  // Create mood entries
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

  const moods = await Mood.bulkCreate(moodData);

  // Create a user with id 20
  const user = await User.create({
    id: 20,
    username: 'admin',
    email: 'admin@example.com',
    password: '123456', 
    phone_number: '+11234567890',
    last_login: new Date()
  });

  // Create 7 journal entries for the user
  const journalEntries = [
    { user_id: 20, mood_id: 1, content: 'Feeling great today!' },
    { user_id: 20, mood_id: 2, content: 'A bit down, but managing.' },
    { user_id: 20, mood_id: 3, content: 'Frustrated with work.' },
    { user_id: 20, mood_id: 4, content: 'Anxious about upcoming presentation.' },
    { user_id: 20, mood_id: 5, content: 'Feeling calm after meditation.' },
    { user_id: 20, mood_id: 6, content: 'Just an ordinary day.' },
    { user_id: 20, mood_id: 1, content: 'Excited about the weekend!' },
  ];

  await JournalEntries.bulkCreate(journalEntries);

  console.log('Seed data inserted successfully.');
  process.exit(0);
};

seedDatabase();