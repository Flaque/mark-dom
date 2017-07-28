// Messages
const BAD_MARKDOWN_SRC_TYPE_MESSAGE = `Mark-dom requires either a string or an AST object as the parameter.`;
const doesNotExistMessage = type => `Mark-dom can't find this ${type}.`;

module.exports = {
  badMarkdownSrc: () => new Error(BAD_MARKDOWN_SRC_TYPE_MESSAGE),
  doesNotExist: type => new Error(doesNotExistMessage(type))
};
