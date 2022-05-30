const express = require("express");
const router = express.Router();

const {
  product,
  productAdd,
  productRemove,
  productUpdate,
  productOrder,
  productsAll,
} = require("../controllers/products");
const prefix = "/api/v1";

// Routes
router.get(`${prefix}/products/:id`, product);
router.get(`${prefix}/products-orders/:id`, productOrder);
router.post(`${prefix}/products`, productAdd);
router.delete(`${prefix}/products/:id`, productRemove);
router.put(`${prefix}/products/:id`, productUpdate);
router.get(`${prefix}/products`, productsAll);

module.exports = router;
