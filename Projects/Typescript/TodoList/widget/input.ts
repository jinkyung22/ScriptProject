import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface Input {
  id: string;
  el: HTMLInputElement;
  getValue: () => string;
  focus: () => void;
  clear: () => void;
  dispose: () => void;
}

function _createInput(id: string, option: any): Input {
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
