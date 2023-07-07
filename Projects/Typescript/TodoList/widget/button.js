import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";
function _createButton(id, option) {
    const el = document.createElement("button");
    el.textContent = option.label;
    el.onclick = option.onClick;
    return {
        id: id,
        el: el,
        dispose: function () {
            el.remove();
            removeControl(id);
        },
    };
}
export const createButton = widget(_createButton);
