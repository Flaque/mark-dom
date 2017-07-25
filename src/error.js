// Messages
const BAD_MARKDOWN_SRC_TYPE_MESSAGE = `Mark-dom requires either a string or an AST object as the parameter.`;
const HEADING_DOES_NOT_EXIST = `Mark-dom can't find this heading.`;
const PARAGRAPH_DOES_NOT_EXIST = `Mark-dom can't find this paragraph.`;

module.exports = {
  badMarkdownSrc: () => new Error(BAD_MARKDOWN_SRC_TYPE_MESSAGE),
  headingDoesNotExist: () => new Error(HEADING_DOES_NOT_EXIST),
  paragraphDoesNotExist: () => new Error(PARAGRAPH_DOES_NOT_EXIST)
};
