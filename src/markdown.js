/**
 * @file Defines a MarkdownNode, the main abstraction for the Markdown AST.
 */
const makeTable = require("markdown-table");
const remark = require("remark");
const stringify = require("remark-stringify");
const _ = require("lodash");
const error = require("./error.js");
const { types } = require("./constants.js");
const query = require("./query");

/**
 * Helpers
 */

/**
 * @private
 */
function throwIfNotExist(component, type) {
  if (!component) throw error.doesNotExist(type);
}

/**
 * A MarkdownNode is an object describing a node in the 
 * Abstract Syntax Tree (AST) of the markdown.
 * 
 * @example 
 * import mrk = require("mark-dom");
 * mrk("# Hello").get(); // Will return "# Hello"
 * 
 */
class MarkdownNode {
  /**
   * A markdown node takes either an Abstract Syntax Tree (AST)
   * or a markdown string.
   * 
   * @param {ast|string} src The markdown string that we'll parse into an AST.
   * @param {JSON} [options] Options to be passed into MarkdownNode
   */
  constructor(src, options) {
    if (typeof src === "object") {
      this._ast = options._ast;
      this._pointer = src;
    } else if (typeof src === "string") {
      this._ast = remark().parse(src);
      this._pointer = this._ast;
    } else if (typeof src === "undefined") {
      this._ast = remark().parse(""); // treat undefined like an empty string.
      this._pointer = this._ast;
    } else {
      throw error.badMarkdownSrc();
    }
  }

  /**
   * Returns the markdown string version of the node you're currently on.
   * 
   * @example
   * // Returns "## Subheader"
   * mrk(`
   * # Hello
   * ## Subheader
   * `).heading("## *").get();
   * 
   * @return {String} The String version of the CURRENT node we're on. 
   */
  get() {
    return remark().use(stringify).stringify(this._pointer).trim();
  }

  /**
   * Returns the markdown string version of the entire AST of this piece of 
   * markdown.
   * @return {String} The String version of the ENTIRE compiled Markdown AST.
   */
  getAll() {
    return remark().use(stringify).stringify(this._ast).trim();
  }

  /**
   * Gets a new MarkdownNode representing an aribtary AST type.
   * 
   * @example
   * // Returns "# Hello"
   * mrk().set("# Hello").search("# H*").getAll();
   * 
   * @param {String} 
   * @param {String} [searchWord] A string to search for in the node. Can use wildcard * syntax.
   */
  search(type, searchWord) {
    const node = searchWord
      ? query.where(this._ast, type, searchWord)
      : query.first(this._ast, type);

    throwIfNotExist(node, type);
    return new MarkdownNode(node, { _ast: this._ast });
  }

  /**
   * Gets a new MarkdownNode representing the first heading it finds.
   * 
   * @example 
   * // Returns a MarkdownNode at the heading.
   * mrk("# Hello").heading("H*");
   * 
   * @example 
   * // Returns a MarkdownNode representing "# First"
   * mrk(`
   * # First 
   * some text
   * 
   * # Second
   * other text
   * `).heading();
   * 
   * @param {String} [searchWord] A string to search for in the heading. Can use wildcard * syntax.
   * @return {MarkdownNode} A new child node at the next heading.
   */
  heading(searchWord) {
    return this.search(types.HEADING, searchWord);
  }

  /**
   * Gets a new MarkdownNode representing the first paragraph it finds.
   * 
   * @example 
   * // Returns a MarkdownNode at the paragraph.
   * mrk("Hello").paragraph("H*");
   * 
   * @example 
   * // Returns a MarkdownNode representing "First Paragraph"
   * mrk(`
   * # First 
   * First Paragraph
   * 
   * # Second
   * Second Paragraph
   * `).paragraph();
   * 
   * @param {String} [searchWord] A string to search for in the paragraph. Can use wildcard * syntax.
   * @return {MarkdownNode}
   */
  paragraph(searchWord) {
    return this.search(types.PARAGRAPH, searchWord);
  }

  /**
   * Gets a new MarkdownNode representing the first paragraph it finds 
   *
   * 
   * @param {String} [searchWord] A string to search for somewhere in the table. Can use wildcard * syntax.
   * @return {MarkdownNode}
   */
  table(searchWord) {
    return this.search(types.TABLE, searchWord);
  }

  /**
   * Create a markdown table from an array.
   * @param {Array} array 
   * @return {MarkdownNode}
   */
  setTable(array) {
    const tableAST = remark().parse(makeTable(array));
    const wrappedTable = new MarkdownNode(remark().parse(array), {
      _ast: tableAST
    });

    this._pointer.children = []; // THIS IS PRETTY BAD.
    this._pointer.children.push(wrappedTable.table()._pointer); // TODO: HMMM THIS SEEMS FISHY. PROBABLY SHOULD CLEAR SOME STUFF FIRST

    return new MarkdownNode(this._pointer, { _ast: this._ast });
  }

  /**
   * Sets the current node's value to the str input
   * @param {String} str 
   * @return {MarkdownNode}
   */
  set(str) {
    // In the case that this node is empty, create something new!
    if (_.isEmpty(this._pointer.children)) {
      this._pointer = this._ast = remark().parse(str);
      return new MarkdownNode(this._pointer, { _ast: this._ast });
    }

    this._pointer.children[0].value = str; // TODO: This is probably going to have some weird effects.
    return new MarkdownNode(this._pointer, { _ast: this._ast });
  }

  /**
   * Returns the type of the node you're currently on.
   * 
   * @example 
   * mrk("# Hello").heading().type(); // Returns "heading"
   * 
   * @example
   * mark("Im a paragraph").paragraph().type(); // Returns "paragraph"
   * 
   * @example
   * mrk("hello").type(); // Returns "root"
   * 
   * @return {String} the type of node you're currently on. 
   */
  type() {
    return this._pointer.type;
  }

  /**
   * Returns the value of the node you're on.
   * If get() returns the markdown string of where you're at, this 
   * returns the actual value of where you're at. 
   * 
   * @example
   * mrk("# Hello I am header").value(); // Returns "Hello I am header"
   * 
   * @example
   * var m = mrk("# Hello I am header");
   * const isTrue = m.get() != m.value(); // True
   * 
   * @return {String} The string value of the node you're on.
   */
  value() {
    return this._pointer.children[0].value; // this is probably gonna have some weird effects.
  }
}

module.exports = MarkdownNode;
