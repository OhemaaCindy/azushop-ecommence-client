"use client";

import React, { useContext } from "react";
import { Heart, Star } from "lucide-react";
import { getAllProducts } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Cart } from "@/context/CartContext";
import CardLoader from "./shimmer";
import { useSearchParams } from "next/navigation";

const ProductCard = ({ categoryId }) => {
  // const searchParams = useSearchParams();
  // const categoryId = searchParams.get("categoryId");
  // console.log("🚀 ~ ProductCard ~ categoryId:", categoryId);
  const { cart, addToCart, removeFromCart } = useContext(Cart);

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts", categoryId],
    queryFn: () => getAllProducts(categoryId),
  });
  const allProducts = data || [];
  // console.log("🚀 ~ ProductCard ~ allProducts:", allProducts);

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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh] w-full">
          <CardLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No products to show
            </div>
          ) : (
            allProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer rounded-2xl overflow-hidden p-3 hover:shadow-lg transition"
              >
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
                    <span className="text-sm font-semibold text-teal-600">
                      ${product?.price}
                    </span>
                  </div>
                </Link>

                {/* Cart Button */}
                <div className="mt-3">
                  {cart.some((c) => c.id === product.id) ? (
                    <button
                      className="w-36 text-sm rounded-3xl bg-red-500 text-white font-semibold shadow-md py-2 px-4 transition-all duration-300 ease-in-out hover:opacity-90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(product.id);
                      }}
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="w-36 text-sm rounded-3xl bg-teal-400 text-white font-semibold shadow-md py-2 px-4 transition-all duration-300 ease-in-out hover:opacity-90 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={isLoading}
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ProductCard;
