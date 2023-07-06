var controls = [];

export function addControl(control) {
  controls.push(control);
}

export function getControl(id) {
  return controls.find(function (control) {
    return control.id === id;
  });
}

export function removeControl(id) {
  controls = controls.filter(function (control) {
    return control.id !== id;
  });
}
