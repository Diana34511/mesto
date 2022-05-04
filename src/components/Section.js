export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, shouldPrepend = false) {
    if (shouldPrepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
