import { getControl, addControl, removeControl } from "./core.js";

export function widget(_createControl: Function) {
  const createControl = function (id: string, option: any) {
    const control = _createControl(id, option); // control 생성

    // 공통 기능 추가: append, remove
    control.append = function (child: any) {
      this.getEl().append(child.getEl());
      return getControl(id);
    };

    control.remove = function () {
      this.getEl().remove();
      removeControl(id);
    };

    control.getEl = function () {
      return this.el;
    };

    // controls에 추가
    addControl(control);

    return control;
  };

  return createControl;
}
