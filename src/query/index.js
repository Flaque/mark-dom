const { hasValue } = require("./util.js");

/**
 * Search through the ast for a node that matches the `type` and has a child with the `value`.
 * @param {Object} ast 
 * @param {String} type 
 * @param {String} query 
 */
function where(ast, type, query) {
  const childrenOfType = ast.children.filter(d => d.type === type);
  const childrenThatMatchQuery = childrenOfType.filter(d => hasValue(d, query));
  return childrenThatMatchQuery[0]; // For not only take the first one
}

/**
 * Grabs the first item of a type
 * @param {Object} ast 
 * @param {String} type 
 */
function first(ast, type) {
  const childrenOfType = ast.children.filter(d => d.type === type);
  return childrenOfType[0];
}

module.exports = {
  where,
  first
};
