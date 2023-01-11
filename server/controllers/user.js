const bcrypt = require('bcryptjs');
const User = require('../models/user');

async function login (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).send('Invalid login info.');
    } else {
      const checkUser = await User.find({email: email});

      if(checkUser.length === 1) {
        const user = checkUser[0];
        if (bcrypt.compareSync(password, user.password)) {
          delete user.password;
          res.status(200).send(user);
        } else {
          res.status(403).send('Invalid password.');
        }
      } else {
        res.status(403).send('There is no account with this email.');
      } 
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}


async function register (req, res) {
  try {
    const { firstName, lastName, email, password, designation } = req.body;
    if (!email || !password || !firstName || !lastName || !designation) {
      res.status(403).send('Invalid registration info.');
    } else {
      const checkUser = await User.find({email: email});
      if(checkUser.length > 0) {
        res.status(403).send('An account with this email already exists.');
      } else {
        const salt = bcrypt.genSaltSync(10);
        const pass = bcrypt.hashSync(password, salt);
        
        const result = await User.create({ firstName, lastName, email, password: pass, designation });
        res.status(201).send(result);
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}


module.exports = { register, login };