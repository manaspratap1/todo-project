const router = require('express').Router();
const { requireAuth, requireAdmin } = require('../middlewares/authMiddleware');
const controller = require('../controllers/taskController');

router.get('/tasks', requireAuth, controller.list);
router.get('/tasks/create', requireAuth, requireAdmin, controller.createPage);
router.post('/tasks/create', requireAuth, requireAdmin, controller.create);

router.post('/tasks/update-status/:id', requireAuth, controller.updateStatus);

router.get('/tasks/edit/:id', requireAuth, requireAdmin, controller.editPage);
router.post('/tasks/edit/:id', requireAuth, requireAdmin, controller.updateTask);

router.post('/tasks/delete/:id', requireAuth, requireAdmin, controller.deleteTask);

module.exports = router;