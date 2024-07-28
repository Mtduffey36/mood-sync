const router = require('express').Router();
const userRoutes = require('./user-routes');
const moodRoutes = require('./mood-routes');
const JournalRoutes = require('./JournalEntries-routes');

router.use('/', userRoutes);
router.use('/', moodRoutes);
router.use('/', JournalRoutes);


module.exports = router;
