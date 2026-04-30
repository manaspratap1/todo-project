module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    created_by: DataTypes.INTEGER
  });

  Project.associate = models => {
    Project.hasMany(models.Task, { foreignKey: 'project_id' });
  };

  return Project;
};