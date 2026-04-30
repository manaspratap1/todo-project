const { Task, Project } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.getAdminStats = async () => {
  const now = new Date();

  const total = await Task.count();

  const completed = await Task.count({
    where: { status: 'done' }
  });

  const pending = await Task.count({
    where: { status: { [Op.ne]: 'done' } }
  });

  const overdue = await Task.count({
    where: {
      due_date: { [Op.lt]: now },
      status: { [Op.ne]: 'done' }
    }
  });

  // 🔥 Tasks per project (REAL ANALYTICS)
  const tasksPerProject = await Task.findAll({
    attributes: [
      'project_id',
      [fn('COUNT', col('Task.id')), 'count']
    ],
    include: [{
      model: Project,
      attributes: ['name']
    }],
    group: ['project_id', 'Project.id']
  });

  const statusBreakdown = await Task.findAll({
  attributes: [
    'status',
    [fn('COUNT', col('id')), 'count']
  ],
  group: ['status']
});

return {
  total,
  completed,
  pending,
  overdue,
  tasksPerProject,
  statusBreakdown
};
};

