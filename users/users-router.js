const router = express.Router();

const Users = require('./users-model');

router.get('/', async (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
