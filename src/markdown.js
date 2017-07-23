const remark = require("remark");
const stringify = require("remark-stringify");
const error = require("./error.js");
const { types } = require("./constants.js");
const query = require("./query");

/**
 * Helpers
 */

function throwIfNotExist(component, errorType) {
  if (!component) throw errorType;
}

/**
 * A MarkdownNode is an object describing a node in the 
 * Abstract Syntax Tree (AST) of the markdown.
 */
class MarkdownNode {
  /**
   * A markdown node takes either an Abstract Syntax Tree (AST)
   * or a markdown string.
   * @param {ast|string} src 
   */
  constructor(src, options) {
    if (typeof src === "object") {
      this._pointer = src;
      this._ast = options._ast;
    } else if (typeof src === "string") {
      this._ast = remark().parse(src);
      this._pointer = this._ast;
    } else {
      throw error.badMarkdownSrc();
    }
  }

  /**
   * Returns a new child node at the next heading.
   */
  heading(searchWord) {
    let heading;
    if (!searchWord) {
      heading = this._ast.children.filter(d => d.type === types.HEADING)[0];
    } else {
      heading = query.where(this._ast, types.HEADING, query);
    }

    throwIfNotExist(heading, error.headingDoesNotExist);
    return new MarkdownNode(heading, { _ast: this._ast });
  }

  /**
   * Returns a new child node at the next paragraph.
   */
  paragraph() {
    const paragraph = this._ast.children.filter(
      d => d.type === types.PARAGRAPH
    )[0];
    throwIfNotExist(paragraph, error.paragraphDoesNotExist);
    return new MarkdownNode(paragraph, { _ast: this._ast });
  }

  /**
   * Returns the type of the node you're currently on.
   */
  type() {
    return this._pointer.type;
  }

  /**
   * Returns the markdown string version of the node you're currently on.
   */
  get() {
    return remark().use(stringify).stringify(this._pointer);
  }

  /**
   * Returns the markdown string version of the entire AST of this piece of 
   * markdown.
   */
  getAll() {
    return remark().use(stringify).stringify(this._ast);
  }

  /**
   * Returns the value of the node you're on.
   * If get() returns the markdown string of where you're at, this 
   * returns the actual value of where you're at. For example:
   * 
   * given a header like "# Hello I am header",
   * .value() returns "Hello I am header"
   * and .get() returns "# Hello I am header"
   */
  value() {
    return this._pointer.children[0].value; // this is probably gonna have some weird effects.
  }

  /**
   * Sets the current node's value to the str input
   * @param {String} str 
   */
  set(str) {
    this._pointer.children[0].value = str; // TODO: This is probably going to have some weird effects.

    return new MarkdownNode(this._pointer, { _ast: this._ast });
  }
}

module.exports = MarkdownNode;
