import { addControl } from "./core.js";
import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createDiv(id, option) {
  var el = document.createElement("div");
  var children = [];
  //el.id = id;

  return {
    id: id,
    el: el,
    append: function (control) {
      el.append(control.el);
      children.push(control);
    },
    dispose: function () {
      children.forEach(function (child) {
        child.dispose();
      });

      el.remove();
      removeControl(id);
    },
  };
}
export var createDiv = widget(_createDiv);
