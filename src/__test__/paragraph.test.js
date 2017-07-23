const MarkdownNode = require("../markdown.js");
const markdown = require("../index.js");

const { base } = require("./testHelper.js");

// Paragraph
describe("paragraph function", () => {
  test("it has a paragraph function", () => {
    expect(base.paragraph).toBeDefined();
  });

  test("it can return a MarkdownNode", () => {
    const paragraph = base.paragraph();
    expect(MarkdownNode.prototype.isPrototypeOf(paragraph)).toBe(true);
  });

  test("it will throw an error if it can't find something", () => {
    expect(() => markdown(" ").paragraph()).toThrow();
  });

  test("it can find a paragraph type", () => {
    expect(base.paragraph().type()).toBe("paragraph");
  });

  test("it can find a paragraph inside of a header", () => {
    expect(base.heading().paragraph().type()).toBe("paragraph");
  });
});
