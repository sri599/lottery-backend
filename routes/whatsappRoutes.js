const express = require('express');
const axios = require('axios');

const router = express.Router();

/*
 * Send to single user
 */
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

/*
 * Send to multiple users
 */
router.post('/bulk-send', async (req, res) => {
  try {
    const { phones } = req.body;

    if (!phones || !Array.isArray(phones)) {
      return res.status(400).json({
        success: false,
        message: 'phones must be an array',
      });
    }

    const results = [];

    for (const phone of phones) {
      try {
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

        results.push({
          phone,
          success: true,
          messageId:
            response.data?.messages?.[0]?.id,
        });
      } catch (err) {
        results.push({
          phone,
          success: false,
          error:
            err.response?.data || err.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      total: phones.length,
      sent: results.filter(
        r => r.success
      ).length,
      failed: results.filter(
        r => !r.success
      ).length,
      results,
    });
  } catch (e) {
    console.error(
      'Bulk WhatsApp Error:',
      e.message
    );

    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});
router.post('/bulk-media', async (req, res) => {
  try {
    const {
      phones,
      imageUrl,
      message,
    } = req.body;

    if (!phones || !Array.isArray(phones)) {
      return res.status(400).json({
        success: false,
        message: 'phones must be an array',
      });
    }

    const results = [];

    for (const phone of phones) {
      try {
        let payload;

        // Image + Caption
        if (imageUrl && message) {
          payload = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'image',
            image: {
              link: imageUrl,
              caption: message,
            },
          };
        }

        // Image Only
        else if (imageUrl) {
          payload = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'image',
            image: {
              link: imageUrl,
            },
          };
        }

        // Message Only
        else if (message) {
          payload = {
            messaging_product: 'whatsapp',
            to: phone,
            type: 'text',
            text: {
              body: message,
            },
          };
        } else {
          continue;
        }

        const response = await axios.post(
          `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        results.push({
          phone,
          success: true,
          messageId:
            response.data?.messages?.[0]?.id,
        });
      } catch (err) {
        results.push({
          phone,
          success: false,
          error:
            err.response?.data || err.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      total: phones.length,
      sent: results.filter(
        x => x.success
      ).length,
      failed: results.filter(
        x => !x.success
      ).length,
      results,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

module.exports = router;