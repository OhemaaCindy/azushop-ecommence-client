import React, { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { getAllProducts } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const TrendingProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });
  const popularProducts = data?.slice(0, 10) || [];
  console.log("🚀 ~ TrendingProducts ~ popularProducts:", popularProducts);

  const productImages = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/1381562/pexels-photo-1381562.jpeg",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/8100787/pexels-photo-8100787.jpeg",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/10605234/pexels-photo-10605234.jpeg",
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/7449887/pexels-photo-7449887.jpeg",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/15569182/pexels-photo-15569182.jpeg",
    },
  ];
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

  if (isLoading) {
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
        {popularProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group cursor-pointer  rounded-2xl overflow-hidden p-4 hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img
                src={
                  product?.image ||
                  "https://images.pexels.com/photos/7449887/pexels-photo-7449887.jpeg"
                }
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Wishlist */}
              <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex">{renderStars(product?.rating)}</div>
              <span className="text-xs text-gray-500">
                ({product?.reviewCount})
              </span>
            </div>

            {/* Product Name */}
            <h3 className="text-base font-medium text-gray-900 mb-2">
              {product?.name}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product?.prie}
                  </span>
                )}
                <span className="text-sm font-semibold text-red-600">
                  ${product?.price}
                </span>
              </div>
              <p className="rounded-2xl ring-1 ring-[#F35C7A] text-[#F35C7A] py-2 px-4 hover:bg-[#F35C7A] hover:text-white w-max">
                Add to Cart
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center mt-9 ">
        {/* <button className=" border-2 p-3 rounded-2xl ring-1 ring-[#a30b29] text-[#F35C7A] py-2 px-4 hover:bg-[#F35C7A] hover:text-white">
          SEE MORE
        </button> */}
        <button className="font-bold border-5 p-3 rounded-2xl ring-1 ring-[#0E7490] text-[#0E7490] py-2 px-4 hover:bg-[#0E7490] hover:text-white transition">
          SEE MORE
        </button>
      </div>
    </>
  );
};

export default TrendingProducts;
