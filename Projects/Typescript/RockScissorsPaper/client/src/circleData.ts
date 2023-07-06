import { Item } from "./item.js";

export class CircleData {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  getAll() {
    return this.items;
  }

  getNext(item: Item) {
    const index = this.items.indexOf(item);
    const next = this.items[index + 1];
    return next ? next : this.items[0];
  }
}
