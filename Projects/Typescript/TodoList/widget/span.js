import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createSpan(option) {
  var el = document.createElement("span");
  el.textContent = option.content;

  return {
    el: el,
  };
}
export var createSpan = widget(_createSpan);
