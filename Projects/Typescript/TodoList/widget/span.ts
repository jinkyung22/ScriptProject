import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface SpanOption {
  content: string;
}

interface Span {
  el: HTMLSpanElement;
}

function _createSpan(option: SpanOption): Span {
  const el = document.createElement("span");
  el.textContent = option.content;

  return {
    el: el,
  };
}

export const createSpan = widget(_createSpan);
