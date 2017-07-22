const markdown = require("../index.js");
const { base, exampleMarkdown, strip } = require("./testHelper.js");

describe("getAll function", () => {
  test("it has a getAll function", () => {
    expect(base.getAll).toBeDefined();
  });

  test("it can return text", () => {
    // We expect the string to change a bit spacing, but the content should be the same
    // So we'll compare the stripped spacing to stripped spacing.
    const actual = strip(base.getAll());
    const expected = strip(exampleMarkdown);
    expect(actual).toBe(expected);
  });

  test("it can return ALL the text after getting a node", () => {
    const str = `# Hey there Folks
    I'm mr foops
    `;
    const actual = strip(markdown(str).heading().getAll());
    const expected = strip(str);
    expect(actual).toBe(expected);
  });
});
