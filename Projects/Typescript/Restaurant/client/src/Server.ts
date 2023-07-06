export class Server {
  name: string;
  servtime: number;
  status: string;

  constructor(name: string, servtime: number) {
    this.name = name;
    this.servtime = servtime;
    this.status = "ready";
  }

  isAvailable(): boolean {
    return this.status === "ready";
  }
  servAsync(): Promise<void> {
    const self = this;
    return new Promise<void>(function (resolve) {
      self.status = "serving"; // 요리 중 상태로 변경
      setTimeout(function () {
        self.status = "ready"; // 요리가 완료되면 다시 ready 상태로 변경
        resolve();
      }, self.servtime);
    });
  }
}
