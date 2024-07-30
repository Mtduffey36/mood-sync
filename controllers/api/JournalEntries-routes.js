const express = require('express');
const router = express.Router();
require('dotenv').config();
const { sendEmail } = require('../../public/js/email');
const { User, JournalEntries, Mood } = require('../../models');
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
            }, 0);
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
        // Fetch user email
        const user = await User.findByPk(user_id, {
            attributes: ['email']
        });
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
            averageMoodScore = moodScores.reduce((sum, score) => sum + score, 0);
            averageMoodScore = parseFloat(averageMoodScore.toFixed(2));
        }
        res.json({
            email: user.email,
            moodScores: moodScores,
            averageMoodScore: averageMoodScore
        });
    } catch (err) {
        console.error('Error fetching mood scores:', err);
        res.status(500).json({ error: 'An error occurred while fetching the mood scores.' });
    }
});
router.post("/history", async (req, res) => {
    if (!req.session.loggedIn || !req.session.user_id) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
    }
    try {
        const user_id = req.session.user_id;
        // Fetch user email and calculate mood scores
        const user = await User.findByPk(user_id, {
            attributes: ['email']
        });
        if (!user || !user.email) {
            return res.status(400).json({ success: false, message: 'User email not found' });
        }
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
            averageMoodScore = moodScores.reduce((sum, score) => sum + score, 0);
            averageMoodScore = parseFloat(averageMoodScore.toFixed(2));
        }
        // Define email content based on average mood score
        let emailContent;
        if (averageMoodScore > 14) {
            emailContent = {
                subject: 'Fantastic work on having a positive mindset this week!',
                text: `Hello! We noticed your average mood score is ${averageMoodScore}. Keep up the great work!`,
                html: `<b>Hello!</b><p>We noticed your average mood score is ${averageMoodScore}. Keep up the great work!</p>
                       <ul>
                         <li>Celebrate your achievements</li>
                         <li>Share your positive energy with others</li>
                         <li>Set new goals to maintain your momentum</li>
                         <li>Stay in the present</li>
                         <li>Get a good night's sleep</li>
                       </ul>`
            };
        } else if (averageMoodScore >= -6 && averageMoodScore <= 13) {
            emailContent = {
                subject: 'Mood-Sync: Keep Up the Good Work!',
                text: `Hello! Your average mood score is ${averageMoodScore}. Here are some ideas to maintain your well-being...`,
                html: `<b>Hello!</b><p>Your average mood score is ${averageMoodScore}. Here are some ideas to maintain your well-being:</p>
                       <ul>
                         <li>Set a new personal goal</li>
                         <li>Try a new hobby</li>
                         <li>Plan a fun activity with friends</li>
                         <li>Say some words of affirmation to yourself</li>
                       </ul>`
            };
        } else if (averageMoodScore >= -13 && averageMoodScore < -6) {
            emailContent = {
                subject: 'Let\'s work on syncing your mood a little more this coming week',
                text: `Hello! Your average mood score is ${averageMoodScore}. Here are some ways to improve your mood...`,
                html: `<b>Hello!</b><p>Your average mood score is ${averageMoodScore}. Here are some ways to improve your mood:</p>
                       <ul>
                         <li>Practice daily gratitude</li>
                         <li>Engage in regular physical activity</li>
                         <li>Reach out to a friend or family member</li>
                         <li>Take a break! Disconnect from your phone and social media</li>
                       </ul>`
            };
        } else if (averageMoodScore < -13) {
            emailContent = {
                subject: 'Let\'s take a deep dive to sync your mood for next week',
                text: `Hello! Your average mood score is ${averageMoodScore}. We're here to support you...`,
                html: `<b>Hello!</b><p>Your average mood score is ${averageMoodScore}. We're here to support you:</p>
                       <ul>
                         <li>Consider talking to a mental health professional</li>
                         <li>Practice self-care activities daily</li>
                         <li>Try mindfulness or meditation techniques</li>
                         <li>Consider taking a break from social platforms</li>
                       </ul>`
            };
        }
        if (!emailContent) {
            return res.status(400).json({ success: false, message: 'Unable to generate email content' });
        }
        
        const mailOptions = {
            from: '"Mood-Sync" <your-app-email@gmail.com>',
            to: user.email,
            subject: emailContent.subject,
            text: emailContent.text,
            html: emailContent.html,
            attachments: [{
                filename: 'logo1.png',
                path: '/images/to/logo1.png',
                cid: 'unique@gmail.com'
            }]
        };
        
        const html = `
        <img src= "cid:unique@gmail.com" width:"200">`
       
        

        // Send the email
        const result = await sendEmail(mailOptions);
        console.log(`Email sent to ${user.email}: `, result.messageId);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (err) {
        console.error('Error sending mood email:', err);
        console.error('Error stack:', err.stack);
        console.error('Error message:', err.message);
        res.status(500).json({
            success: false,
            error: 'An error occurred while sending the mood email.',
            details: err.message,
            stack: err.stack
        });
    }
  });
module.exports = router;