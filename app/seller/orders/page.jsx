"use client";
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
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
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orderDetails?.map((order) => (
              <div
                key={order?.id}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="max-w-16 max-h-16 object-cover"
                    src={assets.box_icon}
                    alt="box_icon"
                  />
                  <p className="flex flex-col gap-3">
                    {/* <span className="font-medium">
                      {order.items
                        .map(
                          (item) => item.product.name + ` x ${item.quantity}`
                        )
                        .join(", ")}
                    </span> */}
                    <div className="flex  gap-5">
                      <span>
                        Order Items
                        {order?.orderItems?.map((item) => {
                          return <div key={item.id}>{item?.name}</div>;
                        })}
                      </span>
                      <span>
                        Quantity
                        {order?.orderItems?.map((item) => {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-center"
                            >
                              {item?.qty}
                            </div>
                          );
                        })}
                      </span>
                    </div>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">
                      {order?.fullName || "N/A"}
                    </span>
                    <br />
                    <span>{order?.shippingAddress?.address}</span>
                    <br />
                    <span>{`${order?.shippingAddress?.city}, ${order?.shippingAddress?.postalCode}`}</span>
                    <br />
                    <span>{order?.shippingAddress?.country}</span>
                  </p>
                </div>
                <p className="font-medium my-auto">
                  {/* {currency} */}
                  {order?.amount || "N/A"}
                </p>
                <div>
                  <p className="flex flex-col">
                    <span>Method :{order?.paymentMethod}</span>
                    <span>
                      Date : {format(new Date(order?.createdAt), "MMM do yyyy")}
                    </span>
                    <span>Payment : {order?.status || "N/A"}</span>
                  </p>
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
