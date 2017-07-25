const error = require("../error");

describe("error", () => {
  test("it has badMarkdownSrc error", () => {
    expect(error.badMarkdownSrc).toBeDefined();
  });

  test("badMarkdownSrc can return a new Error", () => {
    expect(Error.prototype.isPrototypeOf(error.badMarkdownSrc())).toBe(true);
  });

  test("it has headingDoesNotExist error", () => {
    expect(error.headingDoesNotExist).toBeDefined();
  });

  test("headingDoesNotExist can return a new Error", () => {
    expect(Error.prototype.isPrototypeOf(error.headingDoesNotExist())).toBe(
      true
    );
  });

  test("it has paragraphDoesNotExist error", () => {
    expect(error.paragraphDoesNotExist).toBeDefined();
  });

  test("paragraphDoesNotExist can return a new Error", () => {
    expect(Error.prototype.isPrototypeOf(error.paragraphDoesNotExist())).toBe(
      true
    );
  });
});
