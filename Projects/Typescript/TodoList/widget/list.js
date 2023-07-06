import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createList(id, option) {
  var el = document.createElement("ul");
  //el.id = id;
  el.style.listStyle = "none";
  el.style.padding = "0";
  render(option.datas, option.columns);

  return {
    id: id,
    el: el,
    reload: function (datas) {
      el.innerHTML = "";
      render(datas, option.columns);
    },
    getValue: function () {
      return el.value;
    },
  };

  function render(datas, columns) {
    datas.forEach(function (data) {
      var liEl = document.createElement("li");

      //컬럼정보를 받아서 그리기
      columns.forEach(function (column) {
        column.id;
        var control = column.render(data);
        liEl.append(control);
      });

      el.append(liEl);
    });
  }
}
export var createList = widget(_createList);
