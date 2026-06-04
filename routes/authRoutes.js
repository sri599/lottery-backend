const express = require('express');
const router = express.Router();

const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {

  try {

    const { username, password } = req.body;

    const admin = await Admin.findOne({
      username,
      password
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    res.json({
      success: true,
      adminId: admin._id,
      role: admin.role,
      name: admin.name
    });

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message
    });

  }

});

module.exports = router;