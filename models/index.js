const User = require('./User');
const Mood = require('./Mood');
const Mainmood = require('./MainMood');
const JournalEntries = require('./JournalEntries');
const Resources = require('./Resources');

// User associations
User.hasMany(JournalEntries, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// JournalEntries associations
JournalEntries.belongsTo(User, {
    foreignKey: 'user_id'
});

JournalEntries.belongsTo(Mood, {
   foreignKey: 'mood_id' 
});

// Mood associations
Mood.hasMany(JournalEntries, {
    foreignKey: 'mood_id',
    onDelete: 'CASCADE'
});

Mood.belongsTo(Mainmood, {
    foreignKey: 'mood_main_id',
    as: 'mainmood'
});

// Mainmood associations
Mainmood.hasMany(Mood, {
    foreignKey: 'mood_main_id',
    as: 'submoods'
});

module.exports = {
    User,
    JournalEntries, 
    Mood,
    Mainmood,
    Resources
};