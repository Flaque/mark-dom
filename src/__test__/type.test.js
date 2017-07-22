const { base } = require("./testHelper.js");

// Type
describe("type function", () => {
  test("it has a type function", () => {
    expect(base.type).toBeDefined();
  });

  test("it can get a type", () => {
    expect(base.type()).toBe("root");
  });
});
