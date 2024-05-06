import { observable } from "mobx";

const userStore = observable({
  userInfo: {},

  setUser(info: Object) {
    this.userInfo = info;
  }
})
 
export default userStore;