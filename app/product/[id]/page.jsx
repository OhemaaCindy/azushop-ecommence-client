"use client";

import Add from "@/components/add";
import CustomizedProducts from "@/components/customizedProducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductImages from "@/components/productImages";
import { getSingleProduct } from "@/services/product.services";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ProductDetailsPage = () => {
  const { id } = useParams();
  console.log("🚀 ~ Product ~ id:", id);

  const { data, isLoading } = useQuery({
    queryKey: ["singleProduct", id],
    queryFn: () => getSingleProduct(id),
  });

  const productData = data || {};

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 flex flex-col lg:flex-row gap-16 ">
        {/* Image container */}
        <div className="w-full lg:w-1/2 h-fit lg:sticky top-20 self-start">
          <ProductImages />
        </div>

        {/* Text container */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8  ">
          {/* Product Title */}
          <h1 className="text-3xl lg:text-3xl font-bold pt-5">
            {productData.name}
          </h1>

          {/* Short description */}
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
            {productData.description}
          </p>

          <hr className="border-gray-200" />

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-lg text-gray-400 line-through">$50</span>
            <span className="text-2xl font-bold text-gray-900">$49</span>
            <span className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded-full">
              10% OFF
            </span>
          </div>

          <hr className="border-gray-200" />

          <CustomizedProducts />

          <Add />

          <hr className="border-gray-200" />

          {/* Product details */}
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed ">
            <div className="">
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                PRODUCT INFO
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo ex, aliquam beatae doloremque nesciunt enim voluptates
                tempora.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                RETURN AND REFUND POLICY
              </h4>
              <p>
                Magnam repellat vitae, facilis a error sapiente nesciunt
                suscipit! Blanditiis voluptate quos in.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-2">
                SHIPPING INFO
              </h4>
              <p>
                Explicabo ex, aliquam beatae doloremque nesciunt enim voluptates
                tempora. Magnam repellat vitae, facilis a error sapiente
                nesciunt suscipit!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
