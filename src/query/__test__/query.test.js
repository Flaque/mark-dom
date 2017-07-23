const query = require("../index.js");
const remark = require("remark");
const { types } = require("../../constants");

const someMarkdown = `
# First 
Some text
# Second
`;

const ast = remark.parse(someMarkdown);

describe("query", () => {
  test("it has a function called first", () => {
    expect(query.first);
  });

  test("it can find the first of a type", () => {
    expect(query.first(ast, types.HEADING).children[0].value).toBe("First");
  });

  test("it can handle not finding something in first", () => {
    expect(query.first(ast, "NOT A TYPE")).toBe(undefined);
  });

  test("it has a function called where", () => {
    expect(query.where).toBeDefined();
  });

  test("it can find an item in an ast", () => {
    expect(query.where(ast, types.HEADING, "Second").children[0].value).toBe(
      "Second"
    );
  });

  test("it can handle not finding something in where", () => {
    expect(query.where(ast, types.HEADING, "Not a header")).toBe(undefined);
  });
});
