// Messages
const NO_SELECTOR_MESSAGE = `Mark-dom requires a selector; it can't be empty.`;

module.exports = {
  noSelector: () => new Error(NO_SELECTOR_MESSAGE)
};
