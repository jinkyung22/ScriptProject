"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircleData = void 0;
var CircleData = /** @class */ (function () {
    function CircleData(items) {
        this.items = items;
    }
    CircleData.prototype.getAll = function () {
        return this.items;
    };
    CircleData.prototype.getNext = function (item) {
        var index = this.items.indexOf(item);
        var next = this.items[index + 1];
        return next ? next : this.items[0];
    };
    return CircleData;
}());
exports.CircleData = CircleData;
