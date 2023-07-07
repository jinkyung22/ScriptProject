import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface ButtonOption {
  label: string;
  onClick: () => void;
}

interface Button {
  id: string;
  el: HTMLButtonElement;
  dispose: () => void;
}

function _createButton(id: string, option: ButtonOption): Button {
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
