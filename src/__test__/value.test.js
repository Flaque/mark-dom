const { base, firstHeaderValue } = require("./testHelper.js");

// Value
describe("value function", () => {
  test("it has a value function", () => {
    expect(base.value).toBeDefined();
  });

  test("it can get a value of a heading", () => {
    expect(base.heading().value()).toBe(firstHeaderValue);
  });
});
