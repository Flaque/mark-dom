const error = require("../error");

const isError = err => Error.prototype.isPrototypeOf(err);

describe("error", () => {
  test("it has badMarkdownSrc error", () => {
    expect(error.badMarkdownSrc).toBeDefined();
  });

  test("badMarkdownSrc can return a new Error", () => {
    expect(isError(error.badMarkdownSrc())).toBe(true);
  });

  test("it has doesNotExist error", () => {
    expect(error.doesNotExist).toBeDefined();
  });

  test("doesNotExist can return a new Error", () => {
    expect(isError(error.doesNotExist())).toBe(true);
  });
});
