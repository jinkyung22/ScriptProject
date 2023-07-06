"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circleData_js_1 = require("./circleData.js");
var item_js_1 = require("./item.js");
function game(item) {
    var next = items.getNext(item);
    if (item === comCurrentItem) {
        alert("비겼습니다.");
    }
    else if (next === comCurrentItem) {
        alert("졌습니다.");
    }
    else {
        alert("이겼습니다.");
    }
    clearInterval(timerID);
    startEl.removeAttribute("disabled");
    items.getAll().forEach(function (item) {
        item.disable(true);
    });
}
var items = new circleData_js_1.CircleData([
    new item_js_1.Item("sissor", "가위", game),
    new item_js_1.Item("rock", "바위", game),
    new item_js_1.Item("paper", "보", game),
]);
var comCurrentItem = items.getAll()[0];
var timerID;
var startEl = document.getElementById("start");
var comEl = document.getElementById("com");
var itemButtonsEl = document.getElementById("item-buttons");
items.getAll().forEach(function (item) {
    item.render(itemButtonsEl);
    item.disable(true);
});
startEl.onclick = function () {
    startEl.setAttribute("disabled", "");
    items.getAll().forEach(function (item) {
        item.disable(false);
    });
    timerID = setInterval(function () {
        comCurrentItem = items.getNext(comCurrentItem);
        comEl.textContent = comCurrentItem.name;
    }, 100);
};
