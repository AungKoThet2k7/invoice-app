import { products } from "../states";
import { createRecordForm } from "./selectors";


export const createRecordFormHandler = (event) => {
  event.preventDefault();
  const data = new FormData(createRecordForm);
  console.log(data.get("select_product"));
  console.log(data.get("quantity"));
  console.log(
    products.find(({ id }) => {
      id === data.get("select_product");
    })
  );
};
