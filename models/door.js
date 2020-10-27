class Door {
  constructor(_id, _doorState, _dateTime, _name, _publicKey) {
    this.id = _id;
    this.doorState = _doorState;
    this.dateTime = _dateTime;
    this.name = _name;
    this.publicKey = _publicKey;
  }
  id;
  doorState;
  dateTime;
  name;
  publicKey;

  getFieldsNames() {
    return ["id", "doorState", "dateTime", "name", "publicKey"];
  }
}
module.exports = { Door };
