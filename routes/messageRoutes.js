const express = require('express');
const router = express.Router();

const MessageLog =
  require('../models/MessageLog');

router.post('/send', async (req, res) => {

  try {

    const {
      adminId,
      customerIds,
      message
    } = req.body;

    const log =
      await MessageLog.create({
        adminId,
        customerIds,
        message
      });

    res.json({
      success: true,
      data: log
    });

  } catch (e) {

    res.status(500).json({
      message: e.message
    });

  }

});

module.exports = router;