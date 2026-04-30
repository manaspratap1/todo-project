const { Task, User, Project } = require('../models');


// 🔹 LIST TASKS
exports.list = async (req, res, next) => {
  try {
    const user = req.session?.user;
    if (!user) return res.redirect('/auth/login');

    const include = [
      { model: Project, attributes: ['name'] },
      { model: User, as: 'assignee', attributes: ['name'] }
    ];

    let tasks;

    if (user.role === 'admin') {
      tasks = await Task.findAll({
        include,
        order: [['createdAt', 'DESC']]
      });
    } else {
      tasks = await Task.findAll({
        where: { assigned_to: user.id },
        include,
        order: [['createdAt', 'DESC']]
      });
    }

    res.render('tasks', { tasks });

  } catch (err) {
    next(err);
  }
};


// 🔹 CREATE PAGE
exports.createPage = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name'] });
    const projects = await Project.findAll({ attributes: ['id', 'name'] });

    res.render('createTask', { users, projects });

  } catch (err) {
    next(err);
  }
};


// 🔹 CREATE TASK
exports.create = async (req, res, next) => {
  try {
    const user = req.session?.user;
    if (!user) return res.redirect('/auth/login');

    const { title, description, priority, due_date, assigned_to, project_id } = req.body;

    if (!title) {
      const users = await User.findAll();
      const projects = await Project.findAll();

      return res.render('createTask', {
        users,
        projects,
        error: 'Title is required'
      });
    }

    await Task.create({
      title,
      description,
      priority,
      due_date,
      assigned_to,
      project_id,
      status: 'todo',
      created_by: user.id
    });

    res.redirect('/tasks');

  } catch (err) {
    next(err);
  }
};


// 🔹 UPDATE STATUS (MEMBER + ADMIN)
exports.updateStatus = async (req, res, next) => {
  try {
    const user = req.session?.user;
    if (!user) return res.redirect('/auth/login');

    const task = await Task.findByPk(req.params.id);
    if (!task) return res.redirect('/tasks');

    // RBAC check
    if (user.role !== 'admin' && task.assigned_to !== user.id) {
      return res.redirect('/tasks');
    }

    task.status = req.body.status;
    await task.save();

    res.redirect('/tasks');

  } catch (err) {
    next(err);
  }
};


// 🔹 EDIT PAGE
exports.editPage = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.redirect('/tasks');

    const users = await User.findAll({ attributes: ['id', 'name'] });
    const projects = await Project.findAll({ attributes: ['id', 'name'] });

    res.render('editTask', { task, users, projects });

  } catch (err) {
    next(err);
  }
};


// 🔹 UPDATE TASK
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.redirect('/tasks');

    const { title, description, priority, due_date, assigned_to, project_id } = req.body;

    if (!title) return res.redirect(`/tasks/edit/${task.id}`);

    await task.update({
      title,
      description,
      priority,
      due_date,
      assigned_to,
      project_id
    });

    res.redirect('/tasks');

  } catch (err) {
    next(err);
  }
};


// 🔹 DELETE TASK
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.redirect('/tasks');

    await task.destroy();

    res.redirect('/tasks');

  } catch (err) {
    next(err);
  }
};