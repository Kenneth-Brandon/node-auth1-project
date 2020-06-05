const express = require('express');
const UsersDB = require('./users-model.js');
const bcrypt = require('bcryptjs');
const RestMidd = require('../auth/restricted-middleware');
const router = express.Router();

router.use((req, res, next) => {
  console.log('\nUsers Router Used');
  next();
});

router.get('/', RestMidd, async (req, res) => {
  try {
    const users = await UsersDB.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', err: err });
  }
});

module.exports = router;
