const User = require('../models/user.model');

const getAll = async (req, res) => {
  try {
    const users = await User.getAll();
    return res.json({ success: true, message: 'Get all users successfully', data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'Get user successfully', data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { full_name, email, age } = req.body;

    if (!full_name || full_name.trim() === '') {
      return res.status(400).json({ success: false, message: 'full_name is required' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ success: false, message: 'email is required' });
    }
    if (age !== undefined && age !== null && age < 0) {
      return res.status(400).json({ success: false, message: 'age must be >= 0' });
    }

    const existing = await User.getByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const user = await User.createUser({ full_name, email, age });
    return res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const { full_name, email, age } = req.body;

    if (full_name !== undefined && full_name.trim() === '') {
      return res.status(400).json({ success: false, message: 'full_name is required' });
    }
    if (age !== undefined && age !== null && age < 0) {
      return res.status(400).json({ success: false, message: 'age must be >= 0' });
    }
    if (email) {
      const existing = await User.getByEmail(email);
      if (existing && existing.id !== Number(req.params.id)) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    const updated = await User.updateUser(req.params.id, req.body);
    return res.json({ success: true, message: 'User updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    await User.deleteUser(req.params.id);
    return res.json({ success: true, message: 'User deleted successfully', data: null });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
