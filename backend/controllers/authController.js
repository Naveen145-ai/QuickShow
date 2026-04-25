const User = require('../models/userModel');

exports.register = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) return res.status(400).json({ message: 'email is required' });
    const existing = await User.findOne({ email });
    if (existing) return res.json(existing);
    const user = await User.create({ email, name });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message || 'Failed to register' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'email is required' });
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message || 'Failed to login' });
  }
};
