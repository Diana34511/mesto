export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, shouldPrepend = false) {
    if (shouldPrepend) {
      this._containerSelector.prepend(element);
    } else {
      this._containerSelector.append(element);
    }
  }
}
