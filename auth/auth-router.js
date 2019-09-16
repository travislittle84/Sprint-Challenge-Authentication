const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Users = require('../users/users-model.js')

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  console.log('user', user)
  const hash = bcrypt.hashSync(user.password, 2)
  user.password = hash
  Users.add(user)  
    .then(newUser => {
      const token = generateToken(newUser)
      
      res.status(201).json({
        user: newUser,
        token
      });
    })
    .catch(error => {
      res.status(500).json({ message: 'Error while registering', error: error})
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // jwt
        const token = generateToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



function generateToken(user) {
  // create header, payload, and verify signature
  const payload = {
    sub: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;
