import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface DivOption {
  parent?: HTMLElement;
}

interface Div {
  id: string;
  el: HTMLDivElement;
  append: (child: DivChild) => void;
  dispose: () => void;
  setStyle: (styles: Record<string, string>) => void;
}

interface DivChild {
  el: HTMLElement;
  dispose: () => void;
}

function _createDiv(id: string, option: DivOption): Div {
  const el = document.createElement("div");
  const children: DivChild[] = [];

  if (option.parent) {
    option.parent.append(el);
  }

  return {
    id: id,
    el: el,
    append: function (child: DivChild) {
      el.append(child.el);
    },
    dispose: function () {
      children.forEach(function (child) {
        child.dispose();
      });

      el.remove();
      removeControl(id);
    },
    setStyle: function (styles: Record<string, string>) {
      Object.keys(styles).forEach((prop) => {
        (this.el.style as any)[prop] = styles[prop];
      });
    },
  };
}

export const createDiv = widget(_createDiv);
