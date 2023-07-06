import { addControl } from "./core.js";

export function widget(creator) {

  return function () {
    //공통된 추가 작업 추가 가능
    var control = creator.apply(null, arguments);
    addControl(control);
    return control;
  };
}
