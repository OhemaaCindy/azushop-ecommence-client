"use client";

import { Cart } from "@/context/CartContext";
import { useContext, useState } from "react";

const Add = ({ productData }) => {
  const { cart, setCart } = useContext(Cart);

  const [quantity, setQuantity] = useState(1);

  const stock = 4;

  const handleQuantity = () => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
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
            Only{" "}
            <span className="text-orange-500 text-xs">
              {productData?.quantity}items{" "}
            </span>
            left! <br />
            {"Don't"} miss it
          </div>
        </div>

        {cart.some((c) => c.id === productData.id) ? (
          <button
            className="w-36 text-sm rounded-3xl bg-gradient-to-r from-[#F35C7A] to-[#a30b29] 
     text-white font-semibold shadow-md 
     py-2 px-4 transition-all duration-300 ease-in-out 
     hover:opacity-90 hover:shadow-lg 
     active:scale-95 
     disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => setCart(cart.filter((c) => c.id !== productData.id))}
          >
            Remove
          </button>
        ) : (
          <button
            className="w-36 text-sm rounded-3xl bg-gradient-to-r from-[#F35C7A] to-[#a30b29] 
     text-white font-semibold shadow-md 
     py-2 px-4 transition-all duration-300 ease-in-out 
     hover:opacity-90 hover:shadow-lg 
     active:scale-95 
     disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => setCart([...cart, productData])}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Add;
// setCart(cart.filter(c)=>c.id !=== productData.id
