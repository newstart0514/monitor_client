import { observable } from "mobx";

const processStore = observable({
  info: [],

  setInfo(info: Object) {
    this.info = info;
  }
})
 
export default processStore;