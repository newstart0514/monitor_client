import { observable } from "mobx";

const contentStore = observable({
  contentInfo: {
    company: '',
    start: '',
    end: '',
    time: '',
    price: '',
    type: '',
    id: 0
  },

  setContent(info: Object) {
    this.contentInfo = {
      ...this.contentInfo,
      ...info
    };
  }
})
 
export default contentStore;