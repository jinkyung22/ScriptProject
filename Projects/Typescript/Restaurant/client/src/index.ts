import { Chef } from "./Chef.js";
import { Menu } from "./Menu.js";
import { Server } from "./Server.js";

interface Order {
  orderNumber: number;
  menu: Menu;
}
interface Cooking {
  menu: Order;
  chef: Chef;
}
interface Serving {
  menu: Order;
  server: Server;
}

//리스트 빈배열로 선언
const orders: Order[] = [];
const cookings: Cooking[] = [];
const servings: Serving[] = [];
let index: number = 0;

//요리사2명, 서버2명(배열로넣어주기)
const chefs: Chef[] = [new Chef("유림"), new Chef("진하")];
const servers: Server[] = [new Server("현철", 1000), new Server("일현", 2000)];

//랜더링 공통함수
function renderItems(
  items: any[],
  containerId: string,
  textCallback: (arg0: any) => any
): void {
  const containerEl = document.getElementById(containerId) as HTMLUListElement;
  containerEl.innerHTML = "";
  items.forEach(function (item) {
    const liEl = document.createElement("li");
    liEl.textContent = textCallback(item);
    containerEl.append(liEl);
  });
}

//주문
function renderOrders(): void {
  renderItems(orders, "orders", function (order) {
    return "Order " + order.orderNumber + ": " + order.menu.name;
  });
}

//요리
function renderCookings(): void {
  renderItems(cookings, "cookings", function (cooking) {
    return `${
      cooking.menu.orderNumber
    } 메뉴: (${cooking.menu.menu.name}) (${cooking.menu.menu.time / 1000}초) -요리사: ${cooking.chef.name} (${cooking.chef.status})`;
  });
}

//서빙
function renderServings(): void {
  renderItems(servings, "servings", function (serving) {
    return `${
      serving.menu.orderNumber
    } 메뉴: (${serving.menu.menu.name}) (${serving.menu.menu.time / 1000}초) -서버: ${serving.server.name} (${serving.server.status})`;
  });
}

//대기중인 요리사찾기
//(요리사가 있을 때까지 대기해야 함) > 비동기작업(promise로 해보기) > 여유시간을 줘야 화면이 안뻗음

function findChef(): Promise<Chef> {
  return new Promise(function (resolve) {
    const findchef = setInterval(function () {
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

function findServer(): Promise<Server> {
  return new Promise(function (resolve) {
    const findserv = setInterval(function () {
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
async function run(menu: Menu): Promise<void> {
  const order: Order = {
    orderNumber: index++,
    menu: menu,
  };
  //주문 추가하고 화면렌더링
  orders.push(order);
  renderOrders();

  try {
    const chef: Chef = await findChef();
    console.log(chef);
    cookings.push({ menu: order, chef: chef });
    renderCookings();

    // 주문 목록에서 해당 주문을 제거하고 화면에 렌더링
    const orderIndex = orders.findIndex(function (orderItem) {
      return orderItem.orderNumber === order.orderNumber;
    });
    if (orderIndex !== -1) {
      orders.splice(orderIndex, 1);
      renderOrders();
    }

    // 요리사한테 메뉴 요리하도록 넘김
    await chef.cookAsync(menu);

    // 대기 중인 서버를 찾아서 반환
    const server: Server = await findServer();

    // 요리가 완료된 주문을 요리 목록에서 제거하고 화면에 렌더링
    const cookingIndex = cookings.findIndex(function (cooking) {
      return cooking.menu.orderNumber === order.orderNumber;
    });
    cookings.splice(cookingIndex, 1);
    renderCookings();

    servings.push({ menu: order, server: server });
    renderServings();
    await server.servAsync();

    // 서빙이 완료된 주문을 서빙 목록에서 제거하고 화면에 렌더링
    const servingIndex = servings.findIndex(function (serving) {
      return serving.menu.orderNumber === order.orderNumber;
    });
    servings.splice(servingIndex, 1);
    renderServings();
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("sundae")?.addEventListener("click", function () {
  run(new Menu("순댓국", 1000));
});

document.getElementById("haejang")?.addEventListener("click", function () {
  run(new Menu("해장국", 2000));
});
