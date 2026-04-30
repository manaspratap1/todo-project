const router = require('express').Router();
const { requireAuth, requireAdmin } = require('../middlewares/authMiddleware');
const controller = require('../controllers/projectController');

router.get('/projects', requireAuth, controller.list);
router.get('/projects/create', requireAuth, requireAdmin, controller.createPage);
router.post('/projects/create', requireAuth, requireAdmin, controller.create);

module.exports = router;