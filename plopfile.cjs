const plopConfig = require('./plop-config/index.js.cjs');

/**
 * Clean, modular plopfile
 * 
 * All generators and helpers are now organized in plop-config/
 * This file reduced from ~1100 lines to ~10 lines!
 */
module.exports = (plop) => {
  plopConfig.register(plop);
};