import ShopByCategories from "./categoySection";
import TrendingProducts from "./trendingProducts";

const HomeProducts = () => {
  return (
    <div>
      <ShopByCategories />
      <section className="px-6 md:px-12 lg:px-20 py-10 text-center">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 [font-family:var(--font-playfair)]">
          Top Trending Products
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
          Discover the latest must-have items that are taking the market by
          storm. Stay ahead with our curated collection of trending products
          designed to elevate your lifestyle.
        </p>
      </section>
      <TrendingProducts />
    </div>
  );
};

export default HomeProducts;
