const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

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
          const token = jwt.sign({ id: user._id}, SECRET);
          res.setHeader("Authorization", "Bearer " + token);

          const proj = {_id: 1, firstName: 1, lastName: 1, email: 1, designation: 1, isAdmin: 1};
          const projectedUsers = await User.find({email: email}, proj);

          res.status(200).send(projectedUsers[0]);
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
        
        const result = await User.create({ firstName, lastName, email, password: pass, designation, isAdmin: false });
        const proj = {_id: 1, firstName: 1, lastName: 1, email: 1, designation: 1, isAdmin: 1};
        const projectedUsers = await User.find({email: email}, proj);

        const token = jwt.sign({ id: result._id}, SECRET);
        res.setHeader("Authorization", "Bearer " + token);
        res.status(201).send(projectedUsers[0]);
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}


async function registerAdmin (req, res) {
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
        
        const result = await User.create({ firstName, lastName, email, password: pass, designation, isAdmin: true });
        const proj = {_id: 1, firstName: 1, lastName: 1, email: 1, designation: 1, isAdmin: 1};
        const projectedUsers = await User.find({email: email}, proj);

        const token = jwt.sign({ id: result._id}, SECRET);
        res.setHeader("Authorization", "Bearer " + token);
        res.status(201).send(projectedUsers[0]);
      }
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}


module.exports = { register, registerAdmin, login };