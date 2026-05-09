/**
 * Handle MongoDB and other errors
 * @param {Object} error - Error object
 * @returns {Object} - Standardized error response
 */
exports.handleError = (error) => {
  if (error.code === 11000) {
    return {
      status: 400,
      message: "Email already exists",
    };
  }

  if (error.kind === "ObjectId") {
    return {
      status: 400,
      message: "Invalid customer ID format",
    };
  }

  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
    return {
      status: 400,
      message: messages || "Validation failed",
    };
  }

  return {
    status: 500,
    message: error.message || "Internal server error",
  };
};
