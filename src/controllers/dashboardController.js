const dashboardService = require('../services/dashboardService');
const { Task } = require('../models');
const { Op } = require('sequelize');

exports.dashboard = async (req, res) => {
  const user = req.session.user;

  if (user.role === 'admin') {
    const stats = await dashboardService.getAdminStats();

    return res.render('dashboard', {
      user,
      stats
    });
  }

  // MEMBER
  const tasks = await Task.findAll({
    where: { assigned_to: user.id }
  });

  const now = new Date();

  const completed = tasks.filter(t => t.status === 'done').length;
  const pending = tasks.filter(t => t.status !== 'done').length;
  const overdue = tasks.filter(
    t => t.due_date && t.due_date < now && t.status !== 'done'
  ).length;

  res.render('dashboard', {
    user,
    tasks,
    completed,
    pending,
    overdue
  });
};