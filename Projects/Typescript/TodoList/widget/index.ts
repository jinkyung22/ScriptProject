import { createButton } from "./button.js";
import { createList } from "./list.js";
import { createCheckbox } from "./checkbox.js";
import { createSpan } from "./span.js";
import { createDiv } from "./div.js";
import { createInput } from "./input.js";
import { getControl } from "./core.js";

declare global {
  interface Window {
    Widget: {
      button: typeof createButton;
      list: typeof createList;
      checkbox: typeof createCheckbox;
      span: typeof createSpan;
      div: typeof createDiv;
      input: typeof createInput;
      getControl: typeof getControl;
    };
  }
}

window.Widget = {
  button: createButton,
  list: createList,
  checkbox: createCheckbox,
  span: createSpan,
  div: createDiv,
  input: createInput,
  getControl: getControl,
};
