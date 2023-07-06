import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createSpan(id, option) {
  var el = document.createElement("span");
  el.textContent = option.label;

  return {
    id: id,
    el: el,
    dispose: function () {
      //DOM과 Controls에 모두 삭제하는 과정
      el.remove();
      removeControl(id);
    },
  };
}
export var createSpan = widget(_createSpan);
