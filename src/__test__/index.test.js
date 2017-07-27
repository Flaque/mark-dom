const mrk = require("../index.js");

test("mrk can throw an error when passed a function", () => {
  const func = () => {};
  expect(() => {
    mrk(func);
  }).toThrow();
});

test("mrk can get some basic markdown", () => {
  expect(mrk("# Hello").get()).toBe("# Hello");
});

test("mrk can take nothing", () => {
  expect(mrk().type()).toBe("root");
});
