import {
  closeSideBarBtnHandler,
  manageIventoryBtnHandler,
  printBtnHandler,
} from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";
import {
  addNewProductBtn,
  closeSideBarBtn,
  createRecordForm,
  manageIventoryBtn,
  printBtn,
  recordGroup,
} from "./selectors";

const listeners = () => {
  manageIventoryBtn.addEventListener("click", manageIventoryBtnHandler);
  closeSideBarBtn.addEventListener("click", closeSideBarBtnHandler);
  addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
  createRecordForm.addEventListener("submit", createRecordFormHandler);
  recordGroup.addEventListener("click", recordGroupHandler);
  printBtn.addEventListener("click", printBtnHandler);
};

export default listeners;
