const MarkdownNode = require("./markdown.js");

module.exports = function markdown(src) {
  return new MarkdownNode(src);
};
