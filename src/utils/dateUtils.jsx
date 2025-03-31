import moment from "moment";

/**
 * Format a date to YYYY-MM-DD (for input fields)
 * @param {string} date - The date string (ISO format or other)
 * @returns {string} Formatted date in YYYY-MM-DD format
 */
export const formatDateForInput = (date) => {
  return date ? moment(date).format("YYYY-MM-DD") : "";
};

/**
 * Convert a date from input (YYYY-MM-DD) to ISO format
 * @param {string} date - The date in YYYY-MM-DD format
 * @returns {string} ISO formatted date
 */
export const formatDateToISO = (date) => {
  return date ? moment(date).toISOString() : "";
};
