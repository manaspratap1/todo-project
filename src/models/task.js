module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    status: DataTypes.ENUM('todo', 'in_progress', 'done'),
    priority: DataTypes.ENUM('low', 'medium', 'high'),
    due_date: DataTypes.DATE,
    project_id: DataTypes.INTEGER,
    assigned_to: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  });

  Task.associate = models => {
    Task.belongsTo(models.User, { foreignKey: 'assigned_to', as: 'assignee' });
    Task.belongsTo(models.Project, { foreignKey: 'project_id' });
  };

  return Task;
};