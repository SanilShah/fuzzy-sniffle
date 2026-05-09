const Customer = require("../models/Customer");
const { validateRequiredFields, hasUpdateData } = require("../utils/validators");
const { handleError } = require("../utils/errorHandler");

/**
 * Create a new customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const requiredFieldsError = validateRequiredFields(
      req.body,
      ["name", "email", "phone"]
    );
    if (requiredFieldsError) {
      return res.status(400).json({
        success: false,
        message: requiredFieldsError,
      });
    }

    const customer = await Customer.create({ name, email, phone, address });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({
      success: false,
      message,
    });
  }
};

/**
 * Get all customers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({
      success: false,
      message,
    });
  }
};

/**
 * Update a customer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.phone) updateData.phone = req.body.phone;
    if (req.body.address !== undefined) updateData.address = req.body.address;

    if (!hasUpdateData(updateData)) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }

    const customer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({
      success: false,
      message,
    });
  }
};

/**
 * Delete a customer by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer deleted successfully",
      data: customer,
    });
  } catch (error) {
    const { status, message } = handleError(error);
    res.status(status).json({
      success: false,
      message,
    });
  }
};