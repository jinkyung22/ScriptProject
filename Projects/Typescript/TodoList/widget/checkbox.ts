import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface CheckBoxOption {
  done: boolean;
  onChange: () => void;
  parent?: HTMLElement;
}

interface CheckBox {
  el: HTMLInputElement;
  getValue: () => string;
}

function _createcheckBox(option: CheckBoxOption): CheckBox {
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
