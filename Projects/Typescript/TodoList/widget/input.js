import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createInput(id, option) {
  var el = document.createElement("input");

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
      //DOM과 Controls에 모두 삭제하는 과정
      el.remove();
      removeControl(id);
    },
  };
}
export var createInput = widget(_createInput);
