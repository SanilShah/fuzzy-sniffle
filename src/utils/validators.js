/**
 * Email regex pattern
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
exports.isValidEmail = (email) => EMAIL_REGEX.test(email);

/**
 * Validate required fields
 * @param {Object} data - Data object to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {string|null} - Error message if validation fails, null otherwise
 */
exports.validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field) => !data[field]);
  
  if (missingFields.length > 0) {
    return `Please provide all required fields: ${missingFields.join(", ")}`;
  }
  
  return null;
};

/**
 * Check if at least one field is provided for update
 * @param {Object} data - Data object to check
 * @returns {boolean}
 */
exports.hasUpdateData = (data) => {
  return Object.keys(data).length > 0;
};
