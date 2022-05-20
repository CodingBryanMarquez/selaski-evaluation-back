const express = require("express");
const router = express.Router();

const orders = require("./orders");
const products = require("./products");
const users = require("./users");

router.use(orders);
router.use(products);
router.use(users);

module.exports = router;
