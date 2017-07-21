// Messages
const NO_SELECTOR_MESSAGE = `Mark-dom requires a selector; it can't be empty.`;
const BAD_MARKDOWN_SRC_TYPE_MESSAGE = `Markdown requires either a string or an AST object as the parameter.`;

module.exports = {
  noSelector: () => new Error(NO_SELECTOR_MESSAGE),
  badMarkdownSrc: () => new Error(BAD_MARKDOWN_SRC_TYPE_MESSAGE)
};
