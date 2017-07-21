const MarkdownNode = require("../markdown.js");
const markdown = require("../index.js");

// Helpers
const firstHeaderValue = `Hey There`;
const firstHeader = `# ${firstHeaderValue}`;
const exampleMarkdown = `${firstHeader}
how you doing.
## Whats up
`;
const base = markdown(exampleMarkdown);

function strip(str) {
  return str.replace(/\s/g, "");
}

// Type
describe("type function", () => {
  test("it has a type function", () => {
    expect(base.type).toBeDefined();
  });

  test("it can get a type", () => {
    expect(base.type()).toBe("root");
  });
});

// Value
describe("value function", () => {
  test("it has a value function", () => {
    expect(base.value).toBeDefined();
  });

  test("it can get a value of a heading", () => {
    expect(base.heading().value()).toBe(firstHeaderValue);
  });
});

// Get
describe("get function", () => {
  test("it has a get function", () => {
    expect(base.get).toBeDefined();
  });

  test("it can return text", () => {
    // We expect the string to change a bit spacing, but the content should be the same
    // So we'll compare the stripped spacing to stripped spacing.
    const expected = strip(base.get());
    const actual = strip(exampleMarkdown);
    expect(expected).toBe(actual);
  });

  test("it can return text after getting a node", () => {
    const expected = strip(base.heading().get());
    const actual = strip(firstHeader);
    expect(expected).toBe(actual);
  });
});

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

// Heading
describe("heading function", () => {
  test("it has a heading function", () => {
    expect(base.heading).toBeDefined();
  });

  test("it can return a MarkdownNode", () => {
    const heading = base.heading();
    expect(MarkdownNode.prototype.isPrototypeOf(heading)).toBe(true);
  });

  test("it can find a heading type", () => {
    expect(base.heading().type()).toBe("heading");
  });

  test("it can find a child header", () => {
    expect(base.heading().heading().type()).toBe("heading");
  });
});
