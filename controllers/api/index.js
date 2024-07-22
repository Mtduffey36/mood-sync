const router = require('express').Router();
const userRoutes = require('./user-routes');
const {login} = require('../authController');

router.use('/', userRoutes);
router.post('/', login);
module.exports = router;
