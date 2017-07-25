const _ = require("lodash");
const matcher = require("matcher");

/**
 * Matches via glob matching
 * @param {String} test the item to test against
 * @param {String} pattern the glob pattern to test against 
 */
function valuesMatch(test, pattern) {
  return matcher.isMatch(test, pattern);
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

module.exports = {
  valuesMatch,
  hasValue
};
