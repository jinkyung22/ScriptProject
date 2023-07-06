"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(key, name, onClick) {
        this.key = key;
        this.name = name;
        this.buttonEl = document.createElement("button");
        this.buttonEl.textContent = name;
        var _self = this;
        this.buttonEl.onclick = function () {
            onClick(_self);
        };
    }
    Item.prototype.render = function (parentEl) {
        parentEl.append(this.buttonEl);
    };
    Item.prototype.disable = function (value) {
        if (value) {
            this.buttonEl.setAttribute("disabled", "");
        }
        else {
            this.buttonEl.removeAttribute("disabled");
        }
    };
    return Item;
}());
exports.Item = Item;
