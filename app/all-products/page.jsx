import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

//  SERVER COMPONENT
const AllProducts = async ({ searchParams }) => {
  const categoryId = (await searchParams).categoryId;
  console.log("🚀 ~ AllProducts ~ categoryId:", categoryId);

  // const searchParams = useSearchParams();
  // const categoryId = searchParams.get("categoryId");
  return (
    <>
      <Navbar />
      <p>categoryId query: {categoryId}</p>

      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
        <div className="flex flex-col items-end pt-12 mb-9">
          <p className="text-2xl font-medium ">All products</p>
          <div className="w-16 h-0.5 bg-pink-600 rounded-full"></div>
        </div>

        <ProductCard categoryId={categoryId} />
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
