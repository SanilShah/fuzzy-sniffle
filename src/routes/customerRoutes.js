const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
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

/**
 * PUT /api/customers/:id
 * Update a customer by ID
 */
router.put("/:id", updateCustomer);

/**
 * DELETE /api/customers/:id
 * Delete a customer by ID
 */
router.delete("/:id", deleteCustomer);

module.exports = router;