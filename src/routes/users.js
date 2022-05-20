const express = require("express");
const router = express.Router();

const { usersAll, user } = require("../controllers/users");
const prefix = "/api/v1";

// Routes
router.get(`${prefix}/users`, usersAll);
router.get(`${prefix}/users/:id`, user);

module.exports = router;
