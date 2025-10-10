const handlebarsHelpers = require('./handlebars-helpers.js.cjs');
const plopHelpers = require('./plop-helpers.js.cjs');

/**
 * Register all helpers with plop instance
 */
function register(plop) {
  // Register plop-specific helpers
  plop.setHelper("requireField", plopHelpers.requireField);

  // Register handlebars helpers
  Object.entries(handlebarsHelpers).forEach(([name, helper]) => {
    plop.setHelper(name, helper);
  });
}

module.exports = {
  register,
};