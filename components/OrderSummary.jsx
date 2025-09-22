"use client";
import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    console.log("Order created with:", {
      address: selectedAddress,
      items: getCartCount(),
      subtotal: getCartAmount(),
      tax: Math.floor(getCartAmount() * 0.02),
      total: getCartAmount() + Math.floor(getCartAmount() * 0.02),
    });
    // TODO: send payload to backend
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-white border rounded-xl shadow-sm p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Order Summary
      </h2>

      <div className="mt-6 space-y-6">
        {/* Address Selector */}
        <div>
          <label className="text-sm font-medium uppercase text-gray-600 block mb-2">
            Shipping Address
          </label>
          <div className="relative">
            <button
              className="w-full flex justify-between items-center px-4 py-2 border rounded-md bg-gray-50 text-gray-700 hover:border-pink-500 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate">
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.city}`
                  : "Select an address"}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}
                <li
                  // onClick={() => router.push("/add-address")}
                  className="px-4 py-2 text-sm text-pink-600 font-medium hover:bg-pink-50 cursor-pointer text-center"
                >
                  <Link href="/add-address"> + Add New Address</Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="text-sm font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow px-3 py-2 border rounded-md text-gray-700 outline-none focus:ring-2 focus:ring-pink-200"
            />
            <button className="bg-pink-600 text-white px-4 rounded-md hover:bg-pink-700">
              Apply
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Items ({getCartCount()})</p>
            <p className="text-gray-800 font-medium">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-green-600">Free</p>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-3">
            <p>Total</p>
            <p className="text-pink-600">
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={createOrder}
        className="w-full mt-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
