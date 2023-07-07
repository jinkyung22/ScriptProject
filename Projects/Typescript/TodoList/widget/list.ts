import { widget } from "./baseWidget.js";
import { removeControl } from "./core.js";

interface ListOption<T> {
  datas: T[];
  columns: ListColumn<T>[];
}

interface List<T> {
  id: string;
  el: HTMLUListElement;
  reload: (datas: T[]) => void;
  getValues: () => string[];
}

interface ListColumn<T> {
  id: string;
  render: (data: T) => HTMLElement;
}

function _createList<T>(id: string, option: ListOption<T>): List<T> {
  const el = document.createElement("ul");
  el.style.listStyle = "none";
  el.style.padding = "0";
  render(option.datas, option.columns);

  return {
    id: id,
    el: el,
    reload: function (datas: T[]) {
      el.innerHTML = "";
      render(datas, option.columns);
    },
    getValues: function () {
      const values: string[] = [];
      const listItems = el.querySelectorAll("li");
      listItems.forEach((li) => {
        const input = li.querySelector("input") as HTMLInputElement;
        if (input) {
          values.push(input.value);
        }
      });
      return values;
    },
  };

  function render(datas: T[], columns: ListColumn<T>[]) {
    datas.forEach(function (data) {
      var liEl = document.createElement("li");

      columns.forEach(function (column) {
        var control = column.render(data);
        liEl.append(control);
      });

      el.append(liEl);
    });
  }
}

export const createList = widget(_createList);
