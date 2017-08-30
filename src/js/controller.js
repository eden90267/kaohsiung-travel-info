import model from './model';
import view from './view';

class Controller {

  constructor() {
    this.offset = 1;
    this.limit = 10;
    this.zone = '';
    this.total = 0;
  }

  init = () => {
    this._updateSelZone();
    this._updateView();
    this.addDOMListeners();
  };

  addDOMListeners = () => {
    // selZone
    document.querySelector('.sel-zone').addEventListener('change', e => {
      if (e.target.value === '') return;
      this.zone = e.target.value;
      this.offset = 1;
      this._updateView();
    }, false);

    // administrativeZoneBtn
    document.querySelector('.administrative-zone-btn').addEventListener('click', e => {
      if (e.target.nodeName !== 'A') return;
      e.preventDefault();
      this.zone = e.target.textContent;
      this.offset = 1;
      this._updateView();
    }, false);

    // pagination
    document.querySelector('.pagination').addEventListener('click', e => {
      if (e.target.nodeName !== 'A') return;
      e.preventDefault();
      switch (e.target.dataset.type) {
        case "prev":
          if (this.getCurrentPage() > 1) {
            this.offset -= 10;
            this._updateView();
          }
          break;
        case "num":
          let idx = e.target.dataset.idx;
          this.offset = (idx - 1) * 10 + 1;
          this._updateView();
          break;
        case "next":
          if (this.getCurrentPage() !== this.getPageTotal()) {
            this.offset += 10;
            this._updateView();
          }
          break;
        default:
          console.error("unsupported type!");
          break;
      }
    }, false);

  };

  _updateSelZone = () => {
    view.updateSelZone(model.getZones());
  };

  _updateView = () => {
    let data = model.getData(this.offset, this.limit, this.zone);
    this.total = data.total;
    view.updateView(this.zone, data.records);
  };

  getPageTotal = () => Math.floor(this.total / 10) + ((this.total % 10 === 0) ? 0 : 1);

  getCurrentPage = () => Math.floor(this.offset / 10) + ((this.offset % 10 === 0) ? 0 : 1);

}

const controller = new Controller();

export default controller;