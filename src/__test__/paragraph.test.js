const MarkdownNode = require("../markdown.js");
const markdown = require("../index.js");

const { base } = require("./testHelper.js");

const specificParagraphMarkdownStr = `
# First
firstParagraph

# Second
secondParagraph
`; // Note this formatting is important

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

  test("it can find a paragraph inside of a heading", () => {
    expect(base.heading().paragraph().type()).toBe("paragraph");
  });

  test("it can find a specific paragraph", () => {
    const mrk = markdown(specificParagraphMarkdownStr);
    expect(mrk.paragraph("secondParagraph").value()).toBe("secondParagraph");
  });

  test("it can find a specific paragraph inside of a heading", () => {
    const mrk = markdown(specificParagraphMarkdownStr);
    expect(mrk.heading("First").paragraph("firstParagraph").value()).toBe(
      "firstParagraph"
    );
  });

  test("it will error if it can't find a specific item", () => {
    const mrk = markdown(specificParagraphMarkdownStr);
    expect(() => {
      mrk.paragraph("I DONT EXIST").value();
    }).toThrow();
  });
});
