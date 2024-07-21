const User = require('./User');
const Mood = require('./Mood');
const JournalEntries = require('./JournalEntries');
const Resources = require('./Resources');

//User associations
User.hasMany(JournalEntries, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//JournalEntries associations
JournalEntries.belongsTo(User,{
    foreignKey: 'user_id'
});

JournalEntries.belongsTo(Mood,{
   foreignKey: 'mood_id' 
});

//Moods associations
Mood.hasMany(JournalEntries, {
    foreignKey: 'mood_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    JournalEntries, 
    Mood,
    Resources
};