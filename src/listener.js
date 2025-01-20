import { closeSideBarBtnHandler, manageIventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler } from "./record";
import {
  addNewProductBtn,
  closeSideBarBtn,
  createRecordForm,
  manageIventoryBtn,
} from "./selectors";

const listeners = () => {
  console.log("Hello");
  manageIventoryBtn.addEventListener("click", manageIventoryBtnHandler);
  closeSideBarBtn.addEventListener("click", closeSideBarBtnHandler);
  addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
  createRecordForm.addEventListener("submit", createRecordFormHandler)
};

export default listeners;
