const { Project } = require('../models');

exports.list = async (req, res) => {
  const projects = await Project.findAll();
  res.render('projects', { projects, user: req.session.user });
};

exports.createPage = (req, res) => {
  res.render('createProject');
};

exports.create = async (req, res) => {
  await Project.create({
    name: req.body.name,
    description: req.body.description,
    created_by: req.session.user.id
  });

  res.redirect('/projects');
};