const router = require('express').Router();
const UsersDB = require('../users/users-model');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  let newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  try {
    await UsersDB.add(newUser);
    res.status(200).json({ message: 'Register Successful', user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', err: err });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UsersDB.findByUserName({ username }).first();
    console.log(
      'auth',
      '\npassword ',
      password,
      '\nuser.password ',
      user.password,
      user
    );
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: 'Log in Successful' });
    } else {
      res.status(401).json({ message: 'invalid credintials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error', err: err });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send('error when trying to delete session');
      } else {
        res.send('session deleted');
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
