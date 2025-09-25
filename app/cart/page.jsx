"use client";

import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useContext } from "react";
import { Cart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, setCart } = useContext(Cart);

  console.log("🚀 ~ CartPage ~ cart:", cart);
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-gray-500">
              Your <span className="font-medium text-pink-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">
              {cart.length} Items
            </p>
          </div>

          {/* 🔹 Empty cart fallback */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              {/* <Image
                src={assets?.empty_cart || "/empty-cart.png"}
                alt="Empty cart"
                width={150}
                height={150}
                className="opacity-80 mb-6"
              /> */}
              <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6 text-sm md:text-base max-w-md">
                Looks like you haven’t added anything yet. Start exploring our
                latest collections and find something you’ll love.
              </p>
              <button
                onClick={() => router.push("/all-products")}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => router.push("/all-products")}
                className="group flex items-center mt-6 gap-2 text-pink-600 mb-6"
              >
                <ArrowLeft
                  className="group-hover:-translate-x-1 transition text-pink-600"
                  size={16}
                />
                Continue Shopping
              </button>

              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full table-auto border-collapse">
                  <thead className="bg-pink-50/50">
                    <tr>
                      <th className="text-left pb-4 pt-3 md:px-4 px-2 text-gray-700 font-medium text-sm md:text-base">
                        Product Details
                      </th>
                      <th className="text-left pb-4 pt-3 md:px-4 px-2 text-gray-700 font-medium text-sm md:text-base">
                        Price
                      </th>
                      <th className="text-left pb-4 pt-3 md:px-4 px-2 text-gray-700 font-medium text-sm md:text-base">
                        Quantity
                      </th>
                      <th className="text-left pb-4 pt-3 md:px-4 px-2 text-gray-700 font-medium text-sm md:text-base">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className="border-t border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="flex items-center gap-4 py-4 md:px-4 px-2">
                            <div>
                              <div className="rounded-lg overflow-hidden bg-gray-100 p-2">
                                <Image
                                  src={item?.images[0]?.imageUrl}
                                  alt={item?.name}
                                  className="w-16 h-auto object-cover"
                                  width={1280}
                                  height={720}
                                />
                              </div>
                            </div>
                            <div className="text-sm hidden md:block">
                              <p className="text-gray-800 font-medium">
                                {item?.name}
                              </p>
                              <button
                                className="text-xs text-red-500 mt-1 hover:underline"
                                onClick={() =>
                                  setCart(cart.filter((c) => c.id !== item.id))
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                          <td className="py-4 md:px-4 px-2 text-gray-600 text-sm md:text-base">
                            ${item?.price}
                          </td>
                          <td className="py-4 md:px-4 px-2">
                            <div className="flex items-center md:gap-2 gap-1">
                              <button
                                onClick={() =>
                                  setCart(
                                    cart.map((c) =>
                                      c.id === item.id && c.quantity > 1
                                        ? { ...c, quantity: c.quantity - 1 }
                                        : c
                                    )
                                  )
                                }
                              >
                                <Image
                                  src={assets?.decrease_arrow}
                                  alt="decrease_arrow"
                                  className="w-4 h-4"
                                />
                              </button>

                              <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                onChange={(e) =>
                                  setCart(
                                    cart.map((c) =>
                                      c.id === item.id
                                        ? {
                                            ...c,
                                            quantity: Number(e.target.value),
                                          }
                                        : c
                                    )
                                  )
                                }
                                className="w-10 border rounded text-center text-sm focus:ring-1 focus:ring-pink-500 outline-none"
                              />

                              <button
                                onClick={() =>
                                  setCart(
                                    cart.map((c) =>
                                      c.id === item.id
                                        ? { ...c, quantity: c.quantity + 1 }
                                        : c
                                    )
                                  )
                                }
                              >
                                <Image
                                  src={assets?.increase_arrow}
                                  alt="increase_arrow"
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 md:px-4 px-2 text-gray-600 text-sm md:text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && <OrderSummary total={total} />}
      </div>
    </>
  );
};

export default CartPage;
