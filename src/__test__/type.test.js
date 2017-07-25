const mrk = require("../index.js");
const { base } = require("./testHelper.js");
const { types } = require("../constants.js");

// Type
describe("type function", () => {
  test("it has a type function", () => {
    expect(base.type).toBeDefined();
  });

  test("it can get a root", () => {
    expect(base.type()).toBe(types.ROOT);
  });

  test("it can get a heading", () => {
    expect(base.heading().type()).toBe(types.HEADING);
  });

  test("it can get a paragraph", () => {
    expect(base.paragraph().type()).toBe(types.PARAGRAPH);
  });

  test("it can get paragraph on a regular string", () => {
    expect(mrk("hi im a paragraph").paragraph().type()).toBe(types.PARAGRAPH);
  });
});
