import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";
function _createDiv(id, option) {
    const el = document.createElement("div");
    const children = [];
    if (option.parent) {
        option.parent.append(el);
    }
    return {
        id: id,
        el: el,
        append: function (child) {
            el.append(child.el);
        },
        dispose: function () {
            children.forEach(function (child) {
                child.dispose();
            });
            el.remove();
            removeControl(id);
        },
        setStyle: function (styles) {
            Object.keys(styles).forEach((prop) => {
                this.el.style[prop] = styles[prop];
            });
        },
    };
}
export const createDiv = widget(_createDiv);
