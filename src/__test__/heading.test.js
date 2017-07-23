const MarkdownNode = require("../markdown.js");
const markdown = require("../index.js");

const { base } = require("./testHelper.js");

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
    expect(() => markdown(" ").heading()).toThrow();
  });

  test("it can find a heading type", () => {
    expect(base.heading().type()).toBe("heading");
  });

  test("it can find a child header", () => {
    expect(base.heading().heading().type()).toBe("heading");
  });
});
