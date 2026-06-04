const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');
const maskPhone =
  require('../helpers/maskPhone');
  router.post('/list', async (req, res) => {

  try {

    const { role } = req.body;

    const customers =
      await Customer.find();

    const result = customers.map((c) => {

      const customer = c.toObject();

      if (role !== 'SUPER_ADMIN') {

        customer.phone =
          maskPhone(customer.phone);

      }

      return customer;

    });

    res.json(result);

  } catch (e) {

    res.status(500).json({
      message: e.message
    });

  }

});

router.get('/', async (req, res) => {
  try {

    const customers =
      await Customer.find();

    res.json(customers);

  } catch (e) {

    res.status(500).json({
      message: e.message
    });

  }
});
router.post('/add', async (req, res) => {
  try {

    const { name, phone, city } = req.body;

    const customer = new Customer({
      name,
      phone,
      city
    });

    await customer.save();

    res.status(201).json({
      success: true,
      message: 'Customer added',
      customer
    });

  } catch (e) {

    res.status(500).json({
      success: false,
      message: e.message
    });

  }
});

module.exports = router;