import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createcheckBox(option){

  var el = document.createElement("input");
  el.type = "checkbox";
  el.checked = option.done;
  el.onchange = option.onChange; // onClick은 콜백함수

  //el를 바로 사용하지 못하도록 하려고 el을 래핑한 담에 반환
  return {
    el: el,
    dispose: function(){
      el.remove();
      removeControl(id);
    }
  };
}

export var createCheckbox = widget(_createcheckBox);