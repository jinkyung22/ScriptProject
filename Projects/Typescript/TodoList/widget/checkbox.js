import { widget } from "./baseWidget.js";
function _createcheckBox(option) {
    const el = document.createElement("input");
    el.type = "checkbox";
    el.checked = option.done;
    el.onchange = option.onChange;
    if (option.parent) {
        option.parent.append(el);
    }
    return {
        el: el,
        getValue: function () {
            return el.value;
        },
    };
}
export const createCheckbox = widget(_createcheckBox);
