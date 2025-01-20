import initialRender from "./initialRender";
import listeners from "./listener";

class Invoice {
  init() {
    initialRender();
    listeners();
    console.log("Invoice App");
  }
}

export default Invoice;
