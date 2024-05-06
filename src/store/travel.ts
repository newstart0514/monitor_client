import { observable } from "mobx";

const travelStore = observable({
  info: [],

  setInfo(info: Object) {
    this.info = info;
  }
})
 
export default travelStore;