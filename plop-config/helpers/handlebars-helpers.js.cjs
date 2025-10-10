/**
 * Handlebars helpers for template rendering
 */
module.exports = {
  // equality check
  eq: (a, b) => a === b,

  // not equal
  ne: (a, b) => a !== b,

  // or condition
  or: (a, b) => a || b,

  // and condition
  and: (a, b) => a && b,

  // check if string contains substring
  includes: (str, substr) => str?.includes(substr),

  // uppercase
  upper: (txt) => (txt || "").toUpperCase(),

  // lowercase
  lower: (txt) => (txt || "").toLowerCase(),

  // default value
  default: (value, fallback) => value || fallback,

  // ternary operator style
  ternary: (cond, a, b) => (cond ? a : b),

  // reverse array for closing tags
  reverse: (arr) => arr?.slice().reverse(),
};