import { products } from "../states";
import { productsRender } from "./inventory";
import { sideBar } from "./selectors";

const initialRender = () => {
    // sideBar.classList.remove("translate-x-full");
  productsRender(products);
};

export default initialRender;
