"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/services/order.services";
import { format } from "date-fns";

const Orders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllOrders"],
    queryFn: getAllOrders,
  });

  const orderDetails = data || [];

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm ">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-6xl rounded-md overflow-hidden shadow bg-white">
            {/* Table Header */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 font-semibold border-b border-gray-300 bg-gray-100 py-3 px-4 text-gray-800">
              <span>Items</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Shipping</span>
              <span className="hidden md:block">Payment Info</span>
            </div>

            {/* Table Rows */}
            {orderDetails?.map((order) => (
              <div
                key={order?.id}
                className="grid grid-cols-4 md:grid-cols-5 gap-4 py-4 px-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Items */}
                <div className="flex flex-col gap-3">
                  {order?.orderItems?.map((item, index) => (
                    <div
                      key={`${order.id}-item-${item.id || index}`}
                      className="flex items-center gap-2"
                    >
                      {/* <Image
                        className="w-10 h-10 object-cover rounded border border-gray-200"
                        src={assets.box_icon}
                        alt="box_icon"
                      /> */}
                      <span className="text-gray-800">{item?.name}</span>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-3 text-gray-700">
                  {order?.orderItems?.map((item, index) => (
                    <span
                      key={`${order.id}-qty-${item.id || index}`}
                      className=""
                    >
                      {item?.qty || "N/A"}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex flex-col gap-3 font-medium text-gray-800">
                  {order?.orderItems?.map((item, index) => (
                    <span
                      key={`${order.id}-price-${item.id || index}`}
                      className=""
                    >
                      ${item?.price || "N/A"}
                    </span>
                  ))}
                </div>

                {/* Shipping */}
                <div className="text-gray-600 text-sm leading-5">
                  <span>{order?.shippingAddress?.address}</span>
                  <br />
                  <span>
                    {order?.shippingAddress?.city || "N/A"},{" "}
                    {order?.shippingAddress?.postalCode || "N/A"}
                  </span>
                  <br />
                  <span>{order?.shippingAddress?.country}</span>
                </div>

                {/* Payment Info */}
                <div className="hidden md:flex flex-col gap-1 text-gray-600 text-sm">
                  <span>
                    <span className="font-medium text-gray-800">Method:</span>{" "}
                    {order?.paymentMethod || "N/A"}
                  </span>
                  <span>
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {format(new Date(order?.createdAt), "MMM do yyyy")}
                  </span>
                  <span>
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    {order?.status || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
