const MarkdownNode = require("../markdown.js");
const markdown = require("../index.js");

// Helpers
const firstHeaderValue = `Hey There`;
const firstHeader = `# ${firstHeaderValue}`;
const exampleMarkdown = `${firstHeader}
how you doing.
## Whats up
`;
const base = markdown(exampleMarkdown);

function strip(str) {
  return str.replace(/\s/g, "");
}

export { strip, exampleMarkdown, firstHeaderValue, firstHeader, base };
