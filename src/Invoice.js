import initialRender from "./initialRender";
import listeners from "./listener";
import observer from "./observer";

class Invoice {
  init() {
    initialRender();
    listeners();
    observer();
  }
}

export default Invoice;
