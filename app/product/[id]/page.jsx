"use client";

import Add from "@/components/add";
import CustomizedProducts from "@/components/customizedProducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductImages from "@/components/productImages";
import { Cart } from "@/context/CartContext";
import { getSingleProduct } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const ProductDetailsPage = () => {
  const { cart, addToCart, removeFromCart, isLoading } = useContext(Cart);
  const { id } = useParams();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProduct(id),
  });

  const productData = data || {};

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-6 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Image container */}
        <div className="w-full lg:w-1/2 h-fit lg:sticky top-20 self-start">
          <ProductImages productData={productData} />
        </div>

        {/* Text container */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {productData.name}
          </h1>

          {/* Short description */}
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            {productData.description}
          </p>

          <hr className="border-gray-200 my-2" />

          {/* Price */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-400 text-base line-through">
              ${productData?.price}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">
              ${productData?.price}
            </span>
            <span className="text-xs sm:text-sm px-2 py-1 bg-red-100 text-red-600 rounded-full">
              10% OFF
            </span>
          </div>

          <hr className="border-gray-200 my-2" />

          <CustomizedProducts />

          <Add productData={productData} />

          <hr className="border-gray-200 my-2" />

          {/* Product details */}
          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                PRODUCT INFO
              </h4>
              <p>
                Elevate your wardrobe with this stylish and versatile piece.
                Designed for comfort and elegance, it pairs perfectly with any
                outfit, whether for casual days or special occasions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                RETURN AND REFUND POLICY
              </h4>
              <p>
                We want you to love your purchase! If you’re not satisfied, you
                can return items within 14 days of delivery. Items must be
                unused, unworn, and in original condition.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                SHIPPING INFO
              </h4>
              <p>We offer fast and reliable shipping on all orders.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Processing Time: Orders are processed within 1–2 business
                  days.
                </li>
                <li>
                  Delivery Time: Standard shipping usually takes 3–7 business
                  days.
                </li>
                <li>
                  Shipping Charges: Calculated at checkout based on your
                  location.
                </li>
                <li>
                  International Shipping: Delivery times may vary depending on
                  your country.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
