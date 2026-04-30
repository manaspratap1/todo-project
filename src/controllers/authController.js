const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return res.render('login', { error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) return res.render('login', { error: 'Invalid credentials' });

  req.session.user = {
    id: user.id,
    role: user.role
  };

  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/auth/login'));
};