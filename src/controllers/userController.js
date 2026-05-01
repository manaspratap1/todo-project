const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.list = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role']
  });

  res.render('users', { users });
};

exports.createPage = (req, res) => {
  res.render('createUser');
};

exports.create = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.render('createUser', { error: 'All fields required' });
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password_hash: hashed,
    role
  });

  res.redirect('/users');
};