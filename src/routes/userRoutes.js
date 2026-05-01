const router = require('express').Router();
const { requireAuth, requireAdmin } = require('../middlewares/authMiddleware');
const controller = require('../controllers/userController');

router.get('/users', requireAuth, requireAdmin, controller.list);
router.get('/users/create', requireAuth, requireAdmin, controller.createPage);
router.post('/users/create', requireAuth, requireAdmin, controller.create);

module.exports = router;