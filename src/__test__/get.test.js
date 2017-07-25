const mrk = require("../index.js");
const {
  base,
  firstHeader,
  exampleMarkdown,
  strip
} = require("./testHelper.js");

// Get
describe("get function", () => {
  test("it has a get function", () => {
    expect(base.get).toBeDefined();
  });

  test("it can return text", () => {
    // We expect the string to change a bit spacing, but the content should be the same
    // So we'll compare the stripped spacing to stripped spacing.
    const expected = strip(base.get());
    const actual = strip(exampleMarkdown);
    expect(expected).toBe(actual);
  });

  test("it can return text after getting a node", () => {
    const actual = strip(base.heading().get());
    const expected = strip(firstHeader);
    expect(actual).toBe(expected);
  });
});
