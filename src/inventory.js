import { products } from "../states";
import {
  newProductName,
  newProductPrice,
  productGroup,
  productListTemplate,
  selectProduct,
} from "./selectors";

import { v4 as uuidv4 } from "uuid";

export const addNewProductBtnHandler = () => {
  const createId = uuidv4();

  productGroup.append(
    createNewProductList(
      createId,
      newProductName.value,
      newProductPrice.valueAsNumber
    )
  );

  products.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });

  selectProduct.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`, createId));

  newProductName.value = null;
  newProductPrice.value = null;
};

export const productsRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productGroup.append(createNewProductList(id, name, price));
    selectProduct.append(new Option(`${name} - ${price}`, id));

  });
};

export const createNewProductList = (id, name, price) => {
  const productList = productListTemplate.content.cloneNode(true);
  const productName = productList.querySelector(".product-name");
  const productPrice = productList.querySelector(".product-price");
  const currentProductList = productList.querySelector(".product-list");

  currentProductList.id = id;

  productName.innerText = name;
  productPrice.innerText = price;
  return productList;
};
