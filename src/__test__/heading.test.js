const MarkdownNode = require("../markdown.js");
const mrk = require("../index.js");

const { base } = require("./testHelper.js");

const specificHeadersMarkdownStr = `
# First
some text here.

# Second
`; // Note this formatting is important

// Heading
describe("heading function", () => {
  test("it has a heading function", () => {
    expect(base.heading).toBeDefined();
  });

  test("it can return a MarkdownNode", () => {
    const heading = base.heading();
    expect(MarkdownNode.prototype.isPrototypeOf(heading)).toBe(true);
  });

  test("it will throw an error if it can't find something", () => {
    expect(() => mrk(" ").heading()).toThrow();
  });

  test("it can find a heading type", () => {
    expect(base.heading().type()).toBe("heading");
  });

  test("it can find a child heading", () => {
    expect(base.heading().heading().type()).toBe("heading");
  });

  test("it can return a child's child heading's text", () => {
    const str = `
# Hello
## Subheader
    `;

    console.log(JSON.stringify(mrk(str).heading()._ast, null, 2));
    expect(mrk(str).heading().heading().get()).toBe("## Subheader");
  });

  test("it can find the first header", () => {
    const mrkNode = mrk(specificHeadersMarkdownStr);

    expect(mrkNode.heading().value()).toBe("First");
  });

  test("it can find a specific header", () => {
    const mrkNode = mrk(specificHeadersMarkdownStr);

    expect(mrkNode.heading("Second").value()).toBe("Second");
  });

  test("it can find a header via glob syntax", () => {
    const mrkNode = mrk(specificHeadersMarkdownStr);

    expect(mrkNode.heading("Se*").value()).toBe("Second");
  });
});
