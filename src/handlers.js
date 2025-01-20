import { sideBar } from "./selectors";

export const manageIventoryBtnHandler = () => {
  sideBar.classList.remove("translate-x-full");
  sideBar.classList.add("duration-300");
};

export const closeSideBarBtnHandler = () => {
  sideBar.classList.add("translate-x-full");
};
