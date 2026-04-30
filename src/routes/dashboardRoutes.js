const router = require('express').Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const controller = require('../controllers/dashboardController');

router.get('/dashboard', requireAuth, controller.dashboard);

module.exports = router;