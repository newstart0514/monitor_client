import { observable } from "mobx";

const processEditStore = observable({
  info: {},

  setInfo(info: Object) {
    this.info = info;
  }
})
 
export default processEditStore;