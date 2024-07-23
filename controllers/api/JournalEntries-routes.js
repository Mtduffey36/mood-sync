const router = require('express').Router();
const { JournalEntries } = require('../../models');
const bcrypt = require('bcrypt');

router.get ('/',async(req,res) => {
    try{
        const dbMoodData 
    }
})

router.post ('/:mood', async (req, res) => {
    try {
      const dbMoodData = await Mood.Create(req.body, {
        where: {id: req.params.id},
      });
    } catch(err){
      console.log(err);
      res.status(400).json(err);
    }
  });