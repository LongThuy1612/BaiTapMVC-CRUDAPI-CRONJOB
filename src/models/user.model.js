const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

User.getAll = () => User.findAll({ order: [['created_at', 'DESC']] });

User.getById = (id) => User.findByPk(id);

User.getByEmail = (email) => User.findOne({ where: { email } });

User.createUser = (data) => User.create(data);

User.updateUser = async (id, data) => {
  const [affected] = await User.update(data, { where: { id } });
  if (affected === 0) return null;
  return User.findByPk(id);
};

User.deleteUser = (id) => User.destroy({ where: { id } });

User.countAll = () => User.count();

module.exports = User;
