"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const AllProducts = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-pink-600 rounded-full"></div>
        </div>

        <ProductCard cart={cart} setCart={setCart} />
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
