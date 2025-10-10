/**
 * Plop validation helpers
 */
function requireField(fieldName) {
  return (value) => {
    if (!value || value.trim() === "") {
      return `${fieldName} is required`;
    }
    return true;
  };
}

module.exports = {
  requireField,
};
