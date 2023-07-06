"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chef = void 0;
var Chef = /** @class */ (function () {
    function Chef(name) {
        this.name = name;
        this.status = "ready";
    }
    Chef.prototype.isAvailable = function () {
        return this.status === "ready";
    };
    Chef.prototype.cookAsync = function (menu) {
        var self = this;
        self.status = "cooking"; // 요리 중 상태로 변경
        return new Promise(function (resolve) {
            setTimeout(function () {
                self.status = "ready"; // 요리가 완료되면 다시 ready 상태로 변경
                resolve();
            }, menu.time);
        });
    };
    return Chef;
}());
exports.Chef = Chef;
