"use client";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/product.services";

const AllProducts = () => {
  const { products } = useAppContext();
  // const { data, isLoading } = useQuery({
  //   queryKey: ["allProducts"],
  //   queryFn: getAllProducts,
  // });
  // const productList = data || [];

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products</p>
          <div className="w-16 h-0.5 bg-pink-600 rounded-full"></div>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full"> */}
        {/* {productList?.map((product, index) => ( */}
        <ProductCard />
        {/* ))} */}
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
};

export default AllProducts;
