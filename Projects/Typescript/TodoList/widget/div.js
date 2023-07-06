import { addControl } from "./core.js";
import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createDiv(id, option) {
  var el = document.createElement("div");
  var children = [];
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
      for (var prop in styles) {
        this.el.style[prop] = styles[prop];
      }
    },
  };
}
export var createDiv = widget(_createDiv);
