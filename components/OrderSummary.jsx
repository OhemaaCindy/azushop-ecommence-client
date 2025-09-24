"use client";
import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { Cart } from "@/context/CartContext";
import { useAddOrder } from "@/hooks/order.hook";
import { cn } from "@/lib/utils";
import { orderSchema } from "@/schemas/order.schema";
import { productSchema } from "@/schemas/product.schema";
import { getAddress } from "@/services/address.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const OrderSummary = ({ total }) => {
  const { cart, setCart } = useContext(Cart);
  // const [total, setTotal] = useState();

  const { currency, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getAddress"],
    queryFn: getAddress,
  });
  // console.log("🚀 ~ OrderSummary ~ data:", data);
  const addressList = data || [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const { mutate, isPending, isError, error } = useAddOrder();

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    // Find the selected address from list
    const selectedAddress = addressList.find(
      (item) => item.id === data.address
    );
    console.log("🚀 ~ onSubmit ~ selectedAddress:", selectedAddress);

    const payload = {
      shippingAddress: {
        address: selectedAddress?.address || "",
        city: selectedAddress?.city || "",
        postalCode: selectedAddress?.postalCode || "",
        country: selectedAddress?.country || "",
      },
      orderItems: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id,
      })),
    };

    console.log("🚀 Final Payload to send:", payload);

    mutate(payload, {
      onSuccess: (res) => {
        reset();
        toast.success("Order placed successfully");
        router.push(`/payment?orderId=${res.id}`);
      },
      onError: (error) => {
        const errorMessage = error.message;
        console.log("🚀 ~ onSubmit ~ errorMessage:", errorMessage);
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
        {isError && <span>{error.message}</span>}
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
                {...register("address")}
                disabled={isLoading}
                className={cn(
                  "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "border-gray-300",
                  errors.address && "border-red-500 bg-red-50"
                )}
              >
                <option value="">Select Address</option>
                {addressList?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item?.address || ""}
                  </option>
                ))}
              </select>

              <div
                onClick={() => router.push("/add-address")}
                className="mt-2 px-4 py-2 border rounded-md text-center cursor-pointer hover:bg-gray-500/10 text-pink-600"
              >
                + Add New Address
              </div>
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Items: {cart?.length}</p>
              <p className="text-gray-800 font-medium">${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Shipping Fee</p>
              <p className="font-medium text-green-600">Free</p>
            </div>

            <div className="flex justify-between text-lg font-semibold border-t pt-3">
              <p>Total</p>
              <p className="text-pink-600">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Place Order */}
        <button
          disabled={isSubmitting || isPending}
          // onClick={createOrder}
          className="w-full mt-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
        >
          {isSubmitting || isPending ? "Placing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderSummary;
