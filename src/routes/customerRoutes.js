const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
} = require("../controllers/customerController");

/**
 * POST /api/customers
 * Create a new customer
 */
router.post("/", createCustomer);

/**
 * GET /api/customers
 * Get all customers
 */
router.get("/", getCustomers);

module.exports = router;