const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { phone } = req.body;

    const response = await axios.post(
      `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: 'hello_world',
          language: {
            code: 'en_US',
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (e) {
    console.error(
      'WhatsApp Error:',
      e.response?.data || e.message
    );

    res.status(500).json({
      success: false,
      error: e.response?.data || e.message,
    });
  }
});

module.exports = router;