const remark = require("remark");
const parser = require("remark-parse");
const error = require("./error.js");

// Privates
let _ast;

class MarkdownNode {
  constructor(src) {
    _ast = remark().parse(src);
  }

  /**
   * Finds an object inside of the AST.
   * @param {String} selector 
   */
  find(selector) {
    if (!selector) throw error.noSelector();
  }
}

module.exports = function markdown(src) {
  return new MarkdownNode(src);
};
