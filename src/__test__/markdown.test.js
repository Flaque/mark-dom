const markdown = require("../markdown.js");

const exampleMarkdown = `# Hey
how you doing.
`;

describe("mark-dom", () => {
  test("it has a find function", () => {
    expect(markdown(exampleMarkdown).find).toBeDefined();
  });

  test("it will throw error if no query", () => {
    expect(() => {
      markdown(exampleMarkdown).find();
    }).toThrow();
  });

  test("it can query for #headers", () => {
    expect(markdown(exampleMarkdown).find("# Hey")).toBeDefined();
  });
});
