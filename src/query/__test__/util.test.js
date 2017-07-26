const { valuesMatch, allButHashes } = require("../util.js");

describe("valuesMatch", () => {
  test("it can match exact strings", () => {
    expect(valuesMatch("hey", "hey")).toBe(true);
  });

  test("it can match values with spaces", () => {
    expect(valuesMatch("hey ", "hey ")).toBe(true);
  });

  test("it can match glob values", () => {
    expect(valuesMatch("cats and dogs", "cats and *")).toBe(true);
  });
});

describe("allButHashes", () => {
  test("it returns original string if no hashes", () => {
    expect(allButHashes("Nohashes")).toBe("Nohashes");
  });

  test("It returns no hashes from a hashed string", () => {
    expect(allButHashes("## hashes")).toBe("hashes");
  });
});
