import { CartItem } from "../interfaces/cart-item.interface";
import { addToCart, cartArray, getTotal, removeFromCart } from "./cart";

const $cartList = document.querySelector("#cart-list") as HTMLUListElement;
const $cartTemplate = document.querySelector(
  "#cart-template"
) as HTMLTemplateElement;
const $cartTotal = document.querySelector(
  "#cart-total"
) as HTMLParagraphElement;

export const renderCartList = async () => {
  $cartList.innerHTML = "";
  cartArray.forEach((cartItem) => {
    const clone = createCartItem(cartItem, $cartTemplate);
    $cartList.appendChild(clone);
  });

  if (cartArray.length === 0) {
    $cartTotal.innerHTML = '<div class="min-h-[85vh] grid place-content-center">carro vacio, agrega un producto</div>';
  } else {
    $cartTotal.textContent = `Total a pagar: $${getTotal().toFixed(2)}`;
  }
};

const createCartItem = (
  cartItem: CartItem,
  $cartTemplate: HTMLTemplateElement
) => {
  const { title, price, quantity, id, image } = cartItem;

  const clone = $cartTemplate.content.cloneNode(true) as HTMLLIElement;
  clone.querySelector("img")!.src = image;
  clone.querySelector("[data-cart='title']")!.textContent = title;
  clone.querySelector("[data-cart='price']")!.textContent = `$${(
    price * quantity
  ).toFixed(2)}`;
  clone.querySelector("[data-cart='quantity']")!.textContent =
    quantity.toString();

  clone
    .querySelector("[data-cart='increment']")!
    .addEventListener("click", () => {
      addToCart({ title, price, id, image });
    });

  clone
    .querySelector("[data-cart='decrement']")!
    .addEventListener("click", () => {
      removeFromCart(id);
    });

  return clone;
};
