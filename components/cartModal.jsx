"use client";

import Link from "next/link";
import React from "react";

const CartModal = () => {
  const cartItems = [
    {
      name: "Product Name 1",
      price: 49,
      quantity: 2,
      available: true,
      image:
        "https://images.pexels.com/photos/1381562/pexels-photo-1381562.jpeg",
    },
    {
      name: "Product Name 2",
      price: 79,
      quantity: 1,
      available: true,
      image:
        "https://images.pexels.com/photos/1381562/pexels-photo-1381562.jpeg",
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems.length ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <div className="flex flex-col gap-6 max-h-64 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-20 h-20 rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <div className="p-1 bg-gray-50 rounded-sm text-sm">
                        ${item.price}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.available ? "Available" : "Out of stock"}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span className="text-red-500 cursor-pointer">Remove</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-2 border-t border-gray-200">
            {/* <div className="flex items-center justify-between font-semibold text-sm mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div> */}
            {/* <p className="text-gray-500 text-xs mb-3">
              Shipping and taxes calculated at checkout
            </p> */}
            <div className="flex justify-between gap-2">
              <Link href="/cart">
                <button className="flex-1 rounded-md py-2 px-3 ring-1 ring-gray-300 hover:bg-gray-50">
                  View Cart
                </button>
              </Link>

              {/* <button className="flex-1 rounded-md py-2 px-3 bg-black text-white hover:bg-gray-800">
                Checkout
              </button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
