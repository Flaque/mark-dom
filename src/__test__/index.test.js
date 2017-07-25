const mrk = require("../index.js");

test("mrk can throw an error when passed a function", () => {
  const func = () => {};
  expect(() => {
    mrk(func);
  }).toThrow();
});
