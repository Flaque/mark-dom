const { base } = require("./testHelper.js");

// Set
describe("set function", () => {
  test("it has a set function", () => {
    expect(base.set).toBeDefined();
  });

  test("it can set a header", () => {
    const title = "yes, hello, I am title";
    expect(base.heading().set(title).value()).toBe(title);
  });
});
