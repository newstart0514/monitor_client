import contentStore from "./content";
import processStore from "./process";
import processDetailStore from "./processDetail";
import processEditStore from "./processEdit";
import travelStore from "./travel";
import userStore from "./user";
 
const storesContext ={
  userStore,
  contentStore,
  travelStore,
  processStore,
  processDetailStore,
  processEditStore
};
 
// 默认导出
export default storesContext;