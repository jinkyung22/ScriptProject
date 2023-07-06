import { CircleData } from "./circleData.js";
import { Item } from "./item.js";

function game(item: Item): void {
  let next = items.getNext(item);

  if (item === comCurrentItem) {
    alert("비겼습니다.");
  } else if (next === comCurrentItem) {
    alert("졌습니다.");
  } else {
    alert("이겼습니다.");
  }

  clearInterval(timerID);
  startEl.removeAttribute("disabled");
  items.getAll().forEach((item) => {
    item.disable(true);
  });
}

const items = new CircleData([
  new Item("sissor", "가위", game),
  new Item("rock", "바위", game),
  new Item("paper", "보", game),
]);

let comCurrentItem = items.getAll()[0];
let timerID: NodeJS.Timer;

const startEl = document.getElementById("start") as HTMLButtonElement;
const comEl = document.getElementById("com") as HTMLElement;
const itemButtonsEl = document.getElementById("item-buttons") as HTMLElement;

items.getAll().forEach((item) => {
  item.render(itemButtonsEl);
  item.disable(true);
});

startEl.onclick = () => {
  startEl.setAttribute("disabled", "");
  items.getAll().forEach((item) => {
    item.disable(false);
  });

  timerID = setInterval(() => {
    comCurrentItem = items.getNext(comCurrentItem);
    comEl.textContent = comCurrentItem.name;
  }, 100);
};
