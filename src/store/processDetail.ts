import { observable } from "mobx";

const processDetailStore = observable({
  info: {},

  setInfo(info: Object) {
    this.info = info;
  }
})
 
export default processDetailStore;