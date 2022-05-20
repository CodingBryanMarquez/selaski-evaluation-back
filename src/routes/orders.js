const express = require("express");
const router = express.Router();

const {
  order,
  orderAdd,
  orderRemove,
  orderUpdate,
  ordersAll,
} = require("../controllers/orders");
const prefix = "/api/v1";

// Routes
router.get(`${prefix}/orders/:id`, order);
router.post(`${prefix}/orders`, orderAdd);
router.delete(`${prefix}/orders/:id`, orderRemove);
router.put(`${prefix}/orders/:id`, orderUpdate);
router.get(`${prefix}/orders`, ordersAll);

module.exports = router;
