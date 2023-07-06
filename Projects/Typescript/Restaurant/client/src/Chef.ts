import { Menu } from "./Menu";

export class Chef {
  name: string;
  status: string;

  constructor(name: string) {
    this.name = name;
    this.status = "ready";
  }
  isAvailable(): boolean {
    return this.status === "ready";
  }

  cookAsync(menu: Menu): Promise<void> {
    const self = this;
    self.status = "cooking"; // 요리 중 상태로 변경
    return new Promise<void>(function (resolve) {
      setTimeout(function () {
        self.status = "ready"; // 요리가 완료되면 다시 ready 상태로 변경
        resolve();
      }, menu.time);
    });
  }
}
