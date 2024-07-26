const express = require('express');
const router = express.Router();
const { JournalEntries, Mood } = require('../../models');

router.post('/dashboard', async (req, res) => {
    try {
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

        // Fetch the last 5 entries for the user
        const entries = await JournalEntries.findAll({
            where: { user_id },
            order: [['created_at', 'DESC']],
            limit: 5,
            include: [{
                model: Mood,
                attributes: ['mood_name', 'mood_score']
            }]
        });

        const plainEntries = entries.map(entry => entry.get({ plain: true }));

        // Calculate the average mood score
        const averageMoodScore = plainEntries.reduce((sum, entry) => sum + (entry.mood ? entry.mood.mood_score : 0), 0) / plainEntries.length;

        res.json({
            success: true,
            message: 'Journal entry saved successfully',
            entries: plainEntries,
            averageMoodScore
        });
    } catch (err) {
        console.error('Error saving journal entry:', err);
        res.status(500).json({ error: 'An error occurred while saving the journal entry.' });
    }
});

module.exports = router;