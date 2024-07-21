const router = require('express').Router();
const { Mood } = require('../../models');
const bcrypt = require('bcrypt');


//doube check the route needed for mood enteries from the form
router.get('/', async(req, res) => {
    try{
      const dbUserData = await Mood.findAll({
      });
      res.status(200).json(dbUserData);
    }catch (err){
      res.status(500).json(err);
    }
  
  });


  module.exports = router;