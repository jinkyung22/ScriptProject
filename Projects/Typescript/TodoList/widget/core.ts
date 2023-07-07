interface Control {
  id: string;
}

let controls: Control[] = [];

export function addControl(control: Control): void {
  controls.push(control);
}

export function getControl(id: string): Control | undefined {
  return controls.find(function (control) {
    return control.id === id;
  });
}

export function removeControl(id: string): void {
  controls = controls.filter(function (control) {
    return control.id !== id;
  });
}