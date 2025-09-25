"use client";

import { Cart } from "@/context/CartContext";
import { useContext, useEffect } from "react";

const Add = ({ productData }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(Cart);

  const existingItem = cart.find((item) => item.id === productData?.id);
  const quantity = existingItem ? existingItem.quantity : 1;

  const stock = productData?.quantity || 4;

  const handleQuantity = (type) => {
    if (!productData) return;

    let newQuantity = quantity;

    if (type === "d" && quantity > 1) {
      newQuantity = quantity - 1;
    }
    if (type === "i" && quantity < stock) {
      newQuantity = quantity + 1;
    }

    if (existingItem) {
      // Update quantity in cart immediately
      updateQuantity(productData.id, newQuantity);
    } else if (type === "i" && newQuantity === 1) {
      // If item is not in cart yet, we can pre-add it with quantity 1
      addToCart({ ...productData, quantity: newQuantity });
    }
  };

  const handleAddToCart = () => {
    if (!productData) return;

    if (!existingItem) {
      addToCart({ ...productData, quantity: 1 });
    }
  };

  const handleRemoveFromCart = () => {
    if (productData) removeFromCart(productData.id);
  };

  const isInCart = !!existingItem;

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>

          <div className="">
            Only <span className="text-orange-500 text-xs">{stock} items</span>{" "}
            left! <br />
            {"Don't"} miss it
          </div>
        </div>

        {isInCart ? (
          <button
            className="w-36 text-sm rounded-3xl bg-red-500 
            text-white font-semibold shadow-md 
            py-2 px-4 transition-all duration-300 ease-in-out 
            hover:bg-red-700 hover:shadow-lg 
            active:scale-95"
            onClick={handleRemoveFromCart}
          >
            Remove
          </button>
        ) : (
          <button
            className="w-36 text-sm rounded-3xl bg-teal-400 
    text-white font-semibold shadow-md 
    py-2 px-4 transition-all duration-300 ease-in-out 
    hover:opacity-90 hover:shadow-lg 
    active:scale-95"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Add;
