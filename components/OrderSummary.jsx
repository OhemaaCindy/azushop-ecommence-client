"use client";
import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { Cart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { productSchema } from "@/schemas/product.schema";
import { getAddress } from "@/services/address.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const OrderSummary = () => {
  const { cart, setCart } = useContext(Cart);
  const [total, setTotal] = useState();

  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  }, []);

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

  const { data, isLoading } = useQuery({
    queryKey: ["getAddress"],
    queryFn: getAddress,
  });
  console.log("🚀 ~ OrderSummary ~ data:", data);
  const addressList = data || [];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  // const {mutate,isPending,isError,error} = useMutation()
  const onSubmit = (data) => {
    addProduct(data, {
      onSuccess: () => {
        toast.success("Product created successfully");
        reset();
      },
      onError: (error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="w-full md:w-96 bg-white border rounded-xl shadow-sm p-6">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Order Summary
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 space-y-6">
          {/* Address Selector */}
          <div>
            <label className="text-sm font-medium uppercase text-gray-600 block mb-2">
              Shipping Address
            </label>

            <div className="relative">
              {isLoading && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 rounded-md">
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              )}
              <select
                {...register("category")}
                disabled={isLoading}
                className={cn(
                  "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "border-gray-300",
                  errors.category && "border-red-500 bg-red-50"
                )}
              >
                <option value="">Select Address</option>
                {addressList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item?.address || ""}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Items: {cart?.length}</p>
              <p className="text-gray-800 font-medium">${total}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-medium text-green-600">Free</p>
            </div>
            {/* <div className="flex justify-between text-sm">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div> */}
            <div className="flex justify-between text-lg font-semibold border-t pt-3">
              <p>Total</p>
              <p className="text-pink-600">${total}</p>
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
      </form>
    </div>
  );
};

export default OrderSummary;
