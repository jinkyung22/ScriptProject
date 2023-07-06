"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var Chef_js_1 = require("./Chef.js");
var Menu_js_1 = require("./Menu.js");
var Server_js_1 = require("./Server.js");
//리스트 빈배열로 선언
var orders = [];
var cookings = [];
var servings = [];
var index = 0;
//요리사2명, 서버2명(배열로넣어주기)
var chefs = [new Chef_js_1.Chef("유림"), new Chef_js_1.Chef("진하")];
var servers = [new Server_js_1.Server("현철", 1000), new Server_js_1.Server("일현", 2000)];
//랜더링 공통함수
function renderItems(items, containerId, textCallback) {
    var containerEl = document.getElementById(containerId);
    containerEl.innerHTML = "";
    items.forEach(function (item) {
        var liEl = document.createElement("li");
        liEl.textContent = textCallback(item);
        containerEl.append(liEl);
    });
}
//주문
function renderOrders() {
    renderItems(orders, "orders", function (order) {
        return "Order " + order.orderNumber + ": " + order.menu.name;
    });
}
//요리
function renderCookings() {
    renderItems(cookings, "cookings", function (cooking) {
        return "".concat(cooking.menu.orderNumber, " \uBA54\uB274: (").concat(cooking.menu.menu.name, ") (").concat(cooking.menu.menu.time / 1000, "\uCD08) -\uC694\uB9AC\uC0AC: ").concat(cooking.chef.name, " (").concat(cooking.chef.status, ")");
    });
}
//서빙
function renderServings() {
    renderItems(servings, "servings", function (serving) {
        return "".concat(serving.menu.orderNumber, " \uBA54\uB274: (").concat(serving.menu.menu.name, ") (").concat(serving.menu.menu.time / 1000, "\uCD08) -\uC11C\uBC84: ").concat(serving.server.name, " (").concat(serving.server.status, ")");
    });
}
//대기중인 요리사찾기
//(요리사가 있을 때까지 대기해야 함) > 비동기작업(promise로 해보기) > 여유시간을 줘야 화면이 안뻗음
function findChef() {
    return new Promise(function (resolve) {
        var findchef = setInterval(function () {
            chefs.forEach(function (chef) {
                if (chef.isAvailable()) {
                    clearInterval(findchef);
                    resolve(chef);
                }
            });
        }, 100);
    });
}
//대기중인 서버찾기
function findServer() {
    return new Promise(function (resolve) {
        var findserv = setInterval(function () {
            servers.forEach(function (server) {
                if (server.isAvailable()) {
                    clearInterval(findserv);
                    resolve(server);
                }
            });
        }, 100);
    });
}
// 주문, 요리, 서빙의 메인 프로세스는 이 함수에서 전부 처리되어야함(화면이 뻗으면 안됨)
// 비동기 안에 비동기넣으면 콜백지옥 > 어떻게 해결해야할지 생각해보기
function run(menu) {
    return __awaiter(this, void 0, void 0, function () {
        var order, chef, orderIndex, server, cookingIndex, servingIndex, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    order = {
                        orderNumber: index++,
                        menu: menu,
                    };
                    //주문 추가하고 화면렌더링
                    orders.push(order);
                    renderOrders();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, findChef()];
                case 2:
                    chef = _a.sent();
                    console.log(chef);
                    cookings.push({ menu: order, chef: chef });
                    renderCookings();
                    orderIndex = orders.findIndex(function (orderItem) {
                        return orderItem.orderNumber === order.orderNumber;
                    });
                    if (orderIndex !== -1) {
                        orders.splice(orderIndex, 1);
                        renderOrders();
                    }
                    // 요리사한테 메뉴 요리하도록 넘김
                    return [4 /*yield*/, chef.cookAsync(menu)];
                case 3:
                    // 요리사한테 메뉴 요리하도록 넘김
                    _a.sent();
                    return [4 /*yield*/, findServer()];
                case 4:
                    server = _a.sent();
                    cookingIndex = cookings.findIndex(function (cooking) {
                        return cooking.menu.orderNumber === order.orderNumber;
                    });
                    cookings.splice(cookingIndex, 1);
                    renderCookings();
                    servings.push({ menu: order, server: server });
                    renderServings();
                    return [4 /*yield*/, server.servAsync()];
                case 5:
                    _a.sent();
                    servingIndex = servings.findIndex(function (serving) {
                        return serving.menu.orderNumber === order.orderNumber;
                    });
                    servings.splice(servingIndex, 1);
                    renderServings();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
(_a = document.getElementById("sundae")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    run(new Menu_js_1.Menu("순댓국", 1000));
});
(_b = document.getElementById("haejang")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    run(new Menu_js_1.Menu("해장국", 2000));
});
