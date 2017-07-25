/**
 * @file Defines a MarkdownNode, the main abstraction for the Markdown AST.
 */
const remark = require("remark");
const stringify = require("remark-stringify");
const error = require("./error.js");
const { types } = require("./constants.js");
const query = require("./query");

/**
 * Helpers
 */

/**
  * @private
  */
function throwIfNotExist(component, errorType) {
  if (!component) throw errorType;
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
   * Returns the markdown string version of the node you're currently on.
   * 
   * @example
   * // Returns "## Subheader"
   * mrk(`
   * # Hello
   * ## Subheader
   * `).heading().heading().get();
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
    const heading = searchWord
      ? query.where(this._ast, types.HEADING, searchWord)
      : query.first(this._ast, types.HEADING);

    throwIfNotExist(heading, error.headingDoesNotExist);
    return new MarkdownNode(heading, { _ast: this._ast });
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
    const paragraph = searchWord
      ? query.where(this._ast, types.PARAGRAPH, searchWord)
      : query.first(this._ast, types.PARAGRAPH);

    throwIfNotExist(paragraph, error.paragraphDoesNotExist);
    return new MarkdownNode(paragraph, { _ast: this._ast });
  }

  /**
   * Sets the current node's value to the str input
   * @param {String} str 
   * @return {MarkdownNode}
   */
  set(str) {
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
