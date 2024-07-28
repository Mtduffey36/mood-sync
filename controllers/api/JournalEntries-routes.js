const express = require('express');
const router = express.Router();
const { JournalEntries, Mood } = require('../../models');

router.post('/dashboard', async (req, res) => {
    try {
      console.log('Session user ID:', req.session.user_id);
        if (!req.session.loggedIn) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const user_id = req.session.user_id;
        console.log('User ID from session:', user_id);

        if (!user_id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { mood_id, content } = req.body;
        console.log('Received data:', req.body);

        if (!mood_id || !content) {
            return res.status(400).json({ error: 'Mood ID and content are required' });
        }

        // Create the journal entry
        const newEntry = await JournalEntries.create({
            user_id,
            mood_id,
            content
        });

        console.log('New entry created:', JSON.stringify(newEntry, null, 2));
        res.json({
            success: true,
            message: 'Journal entry saved successfully',
        });
        console.log(user_id);
    } catch (err) {
        console.error('Error saving journal entry:', err);
        res.status(500).json({ error: 'An error occurred while saving the journal entry.' });
    }
});


router.get('/history', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.redirect('/login');
        }

        const user_id = req.session.user_id;

        const entries = await JournalEntries.findAll({
            where: { user_id },
            order: [['created_at', 'DESC']],
            include: [{
                model: Mood,
                attributes: ['mood_name', 'mood_score']
            }]
        });

        const plainEntries = entries.map(entry => entry.get({ plain: true }));

        console.log('Number of entries:', plainEntries.length);

        let averageMoodScore = null;
        if (plainEntries.length >= 7) {
            averageMoodScore = plainEntries.reduce((sum, entry) => {
                console.log('Entry mood:', entry.mood); 
                return sum + (entry.mood ? entry.mood.mood_score : 0);
            }, 0) / plainEntries.length;
            averageMoodScore = averageMoodScore.toFixed(2);
        }

        console.log('Average Mood Score:', averageMoodScore); 

        res.render('history', {
            layout: 'main',
            entries: plainEntries,
            averageMoodScore,
            currentPath: req.path
        });
    } catch (err) {
        console.error('Error fetching journal entries:', err);
        res.status(500).json({ error: 'An error occurred while fetching the journal entries.' });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            return res.status(401).json({ error: 'User not logged in' });
        }

        const user_id = req.session.user_id;

        const entries = await JournalEntries.findAll({
            where: { user_id },
            order: [['created_at', 'DESC']],
            include: [{
                model: Mood,
                attributes: ['mood_score']
            }]
        });

        const moodScores = entries.map(entry => {
            const plainEntry = entry.get({ plain: true });
            return plainEntry.mood ? plainEntry.mood.mood_score : null;
        }).filter(score => score !== null);

        let averageMoodScore = null;
        if (moodScores.length >= 7) {
            averageMoodScore = moodScores.reduce((sum, score) => sum + score, 0) / moodScores.length;
            averageMoodScore = parseFloat(averageMoodScore.toFixed(2));
        }

        res.json({
            moodScores: moodScores,
            averageMoodScore: averageMoodScore
        });
    } catch (err) {
        console.error('Error fetching mood scores:', err);
        res.status(500).json({ error: 'An error occurred while fetching the mood scores.' });
    }
});


module.exports = router;