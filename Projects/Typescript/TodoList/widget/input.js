import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";
function _createInput(id, option) {
  const el = document.createElement("input");
  el.id = id;
  return {
    id: id,
    el: el,
    getValue: function () {
      return el.value;
    },
    focus: function () {
      el.focus();
    },
    clear: function () {
      el.value = "";
    },
    dispose: function () {
      el.remove();
      removeControl(id);
    },
  };
}
export const createInput = widget(_createInput);
