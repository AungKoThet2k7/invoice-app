import Swal from "sweetalert2";
import { products } from "../states";
import {
  createRecordForm,
  recordGroup,
  recordNetTotal,
  recordRowTemplate,
  recordTax,
  recordTotal,
} from "./selectors";
import { v4 as uuidv4 } from "uuid";

export const createRecordFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(createRecordForm);
  console.log(formData.get("select_product"));
  console.log(formData.get("quantity"));

  const currentProduct = products.find(
    ({ id }) => id == formData.get("select_product")
  );

  recordGroup.append(createRecordRow(currentProduct, formData.get("quantity")));

  createRecordForm.reset();
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductprice = recordRow.querySelector(".record-price");
  const recordProductquantity = recordRow.querySelector(".record-quantity");
  const recordProductcost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductprice.innerText = price;
  recordProductquantity.innerText = quantity;
  recordProductcost.innerText = price * quantity;

  return recordRow;
};

export const clacRecordCostTotal = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });
  return total;
};

export const clacRecordTax = (ammout, percentage = 5) =>
  (ammout / 100) * percentage;

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure to Delete?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRecordRow = document.querySelector(`[row-id="${rowId}"]`);
      currentRecordRow.remove();
      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your record has been deleted.",
      //   icon: "success",
      // });
    }
  });
};

export const recordGroupHandler = (event) => {
  console.log(event.target.classList.contains("record-remove"));
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  }
};

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const update = () => {
    const currentTotal = clacRecordCostTotal();
    const tax = clacRecordTax(currentTotal);

    recordTotal.innerText = currentTotal;
    recordTax.innerText = tax;
    recordNetTotal.innerText = currentTotal + tax;
  };

  const observer = new MutationObserver(update);
  observer.observe(recordGroup, observerOptions);
};
