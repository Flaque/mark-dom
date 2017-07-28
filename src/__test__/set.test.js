const { base, strip } = require("./testHelper.js");
const mrk = require("../index.js");

// Set
describe("set function", () => {
  test("it has a set function", () => {
    expect(base.set).toBeDefined();
  });

  test("it can set a header", () => {
    const title = "yes, hello, I am title";
    expect(base.heading().set(title).value()).toBe(title);
  });

  test("it can set something after recieving nothing", () => {
    expect(mrk().set("Hey").getAll()).toBe("Hey");
  });

  test("it can override something", () => {
    expect(mrk().set("first").paragraph().set("second").getAll()).toBe(
      "second"
    );
  });

  test("it has a setTable function", () => {
    expect(mrk().setTable).toBeDefined();
  });

  test("it can make tables", () => {
    const table = [["one", "two"], ["a", "b"]];
    const expectedTable = strip(`
      | one | two |
      |---|---|
      | a | b |
    `);
    const actual = strip(mrk().setTable(table).getAll());

    expect(actual).toBe(expectedTable);
  });
});
