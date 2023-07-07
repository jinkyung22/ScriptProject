import { createButton } from "./button.js";
import { createList } from "./list.js";
import { createCheckbox } from "./checkbox.js";
import { createSpan } from "./span.js";
import { createDiv } from "./div.js";
import { createInput } from "./input.js";
import { getControl } from "./core.js";
window.Widget = {
    button: createButton,
    list: createList,
    checkbox: createCheckbox,
    span: createSpan,
    div: createDiv,
    input: createInput,
    getControl: getControl,
};
