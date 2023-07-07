import { widget } from "./baseWidget.js";
function _createSpan(option) {
    const el = document.createElement("span");
    el.textContent = option.content;
    return {
        el: el,
    };
}
export const createSpan = widget(_createSpan);
