const _ = require("lodash");
const matcher = require("matcher");
const remark = require("remark");
const stringify = require("remark-stringify");

/**
 * @param {String} str 
 * @return {String} The first segment, if a string is split by spaces.
 */
function firstSegment(str) {
  return str.split(" ")[0];
}

/**
 * Tests if the list starts with hashes
 * 
 * @example
 * startsWithHashes("## Hello yes I am hashes");  // true
 * startsWithHashes("I am not hashbrowns.");      // false
 * startsWithHashes("##NOTICE_I_HAVE_NO_SPACES"); // false (no space between ## and string)
 * 
 * @param {String} test 
 * @return {Boolean} true if starts with hashes
 */
function startsWithHashes(test) {
  const first = firstSegment(test);
  return Array.from(first).every(x => x === "#"); // All characters are hashes
}

/**
 * Returns the string but without any hashes in front of it.
 * 
 * @example
 * allButHashes("## Hello") // returns "Hello" 
 * 
 * @param {String} str 
 * @return {String} 
 */
function allButHashes(str) {
  if (!startsWithHashes(str)) return str;
  const segments = str.split(" ");
  return segments.splice(1, segments.length).join();
}

/**
 * Matches via glob matching
 * @param {String} test the item to test against
 * @param {String} pattern the glob pattern we're looking for
 */
function valuesMatch(test, pattern) {
  // If we're looking for a header, check that the header length matches.
  if (startsWithHashes(pattern)) {
    if (firstSegment(test) !== firstSegment(pattern)) return false;
    test = allButHashes(test);
    pattern = allButHashes(pattern);
  }

  return matcher.isMatch(test, pattern);
}

/**
 * Returns true if and child of the node contains the query
 * @param {Object} node 
 * @param {String} query 
 */
function hasValue(node, query) {
  const value = remark().use(stringify).stringify(node).trim();
  if (valuesMatch(value, query)) return true; // We found it!
  if (_.isEmpty(node.children)) return false; // We hit a dead end :(

  // Search through every child!
  const searches = node.children.map(c => hasValue(c, query));

  return _.some(searches); // if any work, return true!
}

module.exports = {
  valuesMatch,
  hasValue,
  allButHashes
};
