import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

function _createList(id, option) {
  var el = document.createElement("ul");
  var datas = option.datas;
  var columns = option.columns;
  var childs = [];

  el.style.listStyle = "none";
  el.style.padding = 0;

  render(datas, columns);

  // option.datas;
  // option.columns;

  // addControl(control);
  // Widget.listContents.push(control);
  return {
    id: id,
    el: el,
    reload: function () {
      childs.forEach(function (child) {
        child.dispose();
      });

      render(datas, columns);
    },
    setData: function (inputdatas) {
      datas = inputdatas;
    },
    dispose: function () {
      //자기+ 자식 요소(li+alpha)를 삭제
      childs.forEach(function (child) {
        child.dispose();
      });
      //DOM과 Controls에 모두 삭제하는 과정
      el.remove();
      removeControl(id);
    },
  };

  function render(datas, columns) {
    datas.forEach(function (data) {
      var liEl = createLi();
      childs.push(liEl);

      columns.forEach(function (column) {
        var control = column.render(data);
        childs.push(control);
        liEl.append(control.el);
      });

      el.append(liEl.el);
    });
  }
  function createLi() {
    var el = document.createElement("li");
    return {
      el: el,
      dispose: function () {
        //DOM과 Controls에 모두 삭제하는 과정
        el.remove();
      },
      append: function (child) {
        el.append(child);
      },
    };
  }
}
export var createList = widget(_createList);
