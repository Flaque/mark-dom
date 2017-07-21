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
    const actual = strip(base.heading().get());
    const expected = strip(firstHeader);
    expect(actual).toBe(expected);
  });
});

describe("getAll function", () => {
  test("it has a getAll function", () => {
    expect(base.getAll).toBeDefined();
  });

  test("it can return text", () => {
    // We expect the string to change a bit spacing, but the content should be the same
    // So we'll compare the stripped spacing to stripped spacing.
    const actual = strip(base.getAll());
    const expected = strip(exampleMarkdown);
    expect(actual).toBe(expected);
  });

  test("it can return ALL the text after getting a node", () => {
    const str = `# Hey there Folks
    I'm mr foops
    `;
    const actual = strip(markdown(str).heading().getAll());
    const expected = strip(str);
    expect(actual).toBe(expected);
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

  test("it will throw an error if it can't find something", () => {
    expect(() => markdown(" ").heading()).toThrow();
  });

  test("it can find a heading type", () => {
    expect(base.heading().type()).toBe("heading");
  });

  test("it can find a child header", () => {
    expect(base.heading().heading().type()).toBe("heading");
  });
});

// Paragraph
describe("paragraph function", () => {
  test("it has a paragraph function", () => {
    expect(base.paragraph).toBeDefined();
  });

  test("it can return a MarkdownNode", () => {
    const paragraph = base.paragraph();
    expect(MarkdownNode.prototype.isPrototypeOf(paragraph)).toBe(true);
  });

  test("it will throw an error if it can't find something", () => {
    expect(() => markdown(" ").paragraph()).toThrow();
  });

  test("it can find a paragraph type", () => {
    expect(base.paragraph().type()).toBe("paragraph");
  });

  test("it can find a paragraph inside of a header", () => {
    expect(base.heading().paragraph().type()).toBe("paragraph");
  });
});
