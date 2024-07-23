const router = require('express').Router();
const { JournalEntries } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Moods}]
    });
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }
});