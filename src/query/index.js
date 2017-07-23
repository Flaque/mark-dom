const _ = require("lodash");

/**
 * TODO: turn this into a glob matching statement.
 * @param {String} a 
 * @param {String} b 
 */
function valuesMatch(a, b) {
  return a === b;
}

/**
 * Returns true if and child of the node contains the query
 * @param {Object} node 
 * @param {String} query 
 */
function hasValue(node, query) {
  if (valuesMatch(node.value, query)) return true; // We found it!
  if (_.isEmpty(node.children)) return false; // We hit a dead end :(

  // Search through every child!
  const searches = node.children.map(c => hasValue(c, query));

  return _.some(searches); // if any work, return true!
}

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
