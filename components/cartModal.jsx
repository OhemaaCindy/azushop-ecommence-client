"use client";

import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Cart } from "@/context/CartContext";

const CartModal = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, getCartItemCount } =
    useContext(Cart);
  const modalRef = useRef(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="w-full">
      <div
        ref={modalRef}
        className="w-[400px] max-h-[70vh] overflow-y-scroll absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20"
      >
        {cart.length === 0 ? (
          <>
            <h2 className="text-xl font-semibold">
              Shopping Cart ({getCartItemCount()})
            </h2>
            <div>Cart is Empty</div>
            <Link href="/cart">
              <button className="flex-1 rounded-md py-2 px-3 ring-1 ring-gray-300 hover:bg-gray-50">
                View Cart
              </button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">
              Shopping Cart ({getCartItemCount()})
            </h2>

            <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <img
                    src={item?.images?.[0]?.imageUrl || item.image}
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
                      {/* <div className="text-xs text-gray-500">
                        {item.available ? "Available" : "Out of stock"}
                      </div> */}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex justify-between items-center text-sm mt-1">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                        >
                          -
                        </button>
                        <span className="text-gray-700">
                          {item.quantity || 1}
                        </span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom */}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between gap-2 items-center">
                <span className="font-semibold">Subtotal: ${subtotal}</span>
                <Link href="/cart">
                  <button className="flex-1 rounded-md py-2 px-3 ring-1 ring-gray-300 hover:bg-gray-50">
                    View Cart
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
