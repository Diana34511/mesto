export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      job: this._job,
    };
  }

  setUserInfo({ name, about, _id, cohort, avatar }) {
    this._job = about;
    this._avatar = avatar;
    this._cohort = cohort;
    this._name = name;
    this._id = _id;

    this._nameElement.textContent = this._name;
    this._jobElement.textContent = this._job;
  }
}
