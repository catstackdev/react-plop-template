const helpers = require('./helpers/index.js.cjs');
const generators = require('./generators/index.js.cjs');

/**
 * Main plop configuration entry point
 */
function register(plop) {
  // Register helpers
  helpers.register(plop);
  
  // Register generators
  generators.register(plop);
}

module.exports = {
  register,
};