import { widget } from "./baseWidget.js";
function _createList(id, option) {
    const el = document.createElement("ul");
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
        getValues: function () {
            const values = [];
            const listItems = el.querySelectorAll("li");
            listItems.forEach((li) => {
                const input = li.querySelector("input");
                if (input) {
                    values.push(input.value);
                }
            });
            return values;
        },
    };
    function render(datas, columns) {
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
