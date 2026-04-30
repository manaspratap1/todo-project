const router = require('express').Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { validate } = require('../middlewares/validationMiddleware');

router.get('/auth/login', authController.showLogin);

router.post(
  '/auth/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  validate,
  authController.login
);

router.get('/auth/logout', authController.logout);

module.exports = router;