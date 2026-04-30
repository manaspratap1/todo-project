const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return null;

  return user;
};