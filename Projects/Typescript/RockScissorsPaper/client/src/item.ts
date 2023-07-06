export class Item {
  key: string;
  name: string;
  buttonEl: HTMLButtonElement;

  constructor(key: string, name: string, onClick: (item: Item) => void) {
    this.key = key;
    this.name = name;

    this.buttonEl = document.createElement("button");
    this.buttonEl.textContent = name;

    let _self = this;

    this.buttonEl.onclick = () => {
      onClick(_self);
    };
  }

  render(parentEl: HTMLElement) {
    parentEl.append(this.buttonEl);
  }

  disable(value: boolean) {
    if (value) {
      this.buttonEl.setAttribute("disabled", "");
    } else {
      this.buttonEl.removeAttribute("disabled");
    }
  }
}
