exports.requireAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect('/auth/login');
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (req.session.user.role !== 'admin') return res.redirect('/dashboard');
  next();
};