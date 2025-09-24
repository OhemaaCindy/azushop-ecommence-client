"use client";

import React, { useState, useEffect, useContext } from "react";
import { Heart, Star } from "lucide-react";
import { getAllProducts } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Cart } from "@/context/CartContext";

const TrendingProducts = () => {
  // const { cart, setCart } = useContext(Cart);
  const { cart, addToCart, removeFromCart, isLoading } = useContext(Cart);

  const { data, isLoading: loadingProducts } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });
  const allProducts = data?.slice(0, 10) || [];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  if (loadingProducts) {
    return (
      <div className="px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts?.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer rounded-2xl overflow-hidden p-4 hover:shadow-lg transition"
          >
            {/* Link wraps only product details */}
            <Link href={`/product/${product.id}`}>
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img
                  src={product?.images[0]?.imageUrl}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Wishlist */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-1 justify-between">
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  {product?.name}
                </h3>
                <div className="flex gap-5">
                  <div className="flex">{renderStars(product?.rating)}</div>
                  <span className="text-xs text-gray-500">
                    ({product?.reviewCount})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product?.originalPrice}
                  </span>
                )}
                <span className="text-sm font-semibold text-red-600">
                  ${product?.price}
                </span>
              </div>
            </Link>

            <div className="mt-3">
              {cart.some((c) => c.id === product.id) ? (
                <button
                  className="w-36 text-sm rounded-3xl bg-gradient-to-r from-[#F35C7A] to-[#a30b29] 
        text-white font-semibold shadow-md py-2 px-4 transition-all duration-300 ease-in-out 
        hover:opacity-90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart(product.id); // ✅ Use helper function
                  }}
                  disabled={isLoading}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="w-36 text-sm rounded-3xl bg-gradient-to-r from-[#F35C7A] to-[#a30b29] 
        text-white font-semibold shadow-md py-2 px-4 transition-all duration-300 ease-in-out 
        hover:opacity-90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product); // ✅ Use helper function
                  }}
                  disabled={isLoading}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* See More button */}
      <div className="flex items-center justify-center mt-9 ">
        {/* future "SEE MORE" button goes here */}
      </div>
    </>
  );
};

export default TrendingProducts;
