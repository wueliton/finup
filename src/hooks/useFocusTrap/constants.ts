const focusableElementsSelector = [
  "button:not([disabled]):not([tabindex='-1'])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1']):not([disabled])",
  "details:not([disabled])",
  "summary:not(:disabled)",
].join(",");

const KEYCODE_TAB = 9;

export { focusableElementsSelector, KEYCODE_TAB };
