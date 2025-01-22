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
  // console.log(formData.get("select_product"));
  // console.log(formData.get("quantity"));

  const currentProduct = products.find(
    ({ id }) => id == formData.get("select_product")
  );

  const exitedRecord = document.querySelector(
    `[product-id="${currentProduct.id}"]`
  );

  if (exitedRecord === null) {
    recordGroup.append(
      createRecordRow(currentProduct, formData.get("quantity"))
    );
  } else {
    Swal.fire({
      title: "This product is already exited",
      text: `You want to add quantity to ${currentProduct.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, added it",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRecordQuantity(
          exitedRecord.getAttribute("row-id"),
          parseInt(formData.get("quantity"))
        );
      }
    });
  }

  createRecordForm.reset();
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductprice = recordRow.querySelector(".record-price");
  const recordProductquantity = recordRow.querySelector(".record-quantity");
  const recordProductCost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductprice.innerText = price;
  recordProductquantity.innerText = quantity;
  recordProductCost.innerText = price * quantity;

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
    }
  });
};

// export const quantityMinus = (rowId) => {
//   const currentRecordRow = document.querySelector(`[row-id="${rowId}"]`);
//   const recordProductprice = currentRecordRow.querySelector(".record-price");
//   const recordProductquantity =
//     currentRecordRow.querySelector(".record-quantity");
//   const recordProductCost = currentRecordRow.querySelector(".record-cost");

//   recordProductquantity.innerText =
//     parseInt(recordProductquantity.innerText) - 1;
//   recordProductCost.innerText =
//     recordProductquantity.innerText * recordProductprice.innerText;
// };

// export const quantityPlus = (rowId) => {
//   const currentRecordRow = document.querySelector(`[row-id="${rowId}"]`);
//   const recordProductprice = currentRecordRow.querySelector(".record-price");
//   const recordProductquantity =
//     currentRecordRow.querySelector(".record-quantity");
//   const recordProductCost = currentRecordRow.querySelector(".record-cost");

//   recordProductquantity.innerText =
//     parseInt(recordProductquantity.innerText) + 1;
//   recordProductCost.innerText =
//     recordProductquantity.innerText * recordProductprice.innerText;
// };

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = document.querySelector(`[row-id="${rowId}"]`);
  const recordProductprice = currentRecordRow.querySelector(".record-price");
  const recordProductquantity =
    currentRecordRow.querySelector(".record-quantity");
  const recordProductCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordProductquantity.innerText > 1) {
    recordProductquantity.innerText =
      parseInt(recordProductquantity.innerText) + newQuantity;
    recordProductCost.innerText =
      recordProductquantity.innerText * recordProductprice.innerText;
  }
};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  } else if (event.target.classList.contains("quantity-plus-btn")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), 1);
  } else if (event.target.classList.contains("quantity-minus-btn")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), -1);
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
