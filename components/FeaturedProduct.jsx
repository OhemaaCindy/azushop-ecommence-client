import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/11681770/pexels-photo-11681770.jpeg",
    title: "Effortless Elegance",
    description:
      "Turn heads with timeless pieces designed to match any occasion.",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/13119234/pexels-photo-13119234.jpeg",
    title: "Everyday Glam",
    description: "Chic and comfortable outfits that bring out your true style.",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/9431866/pexels-photo-9431866.jpeg",
    title: "Bold & Beautiful",
    description: "Make a statement with fashion that radiates confidence.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14 px-4 sm:px-6 lg:px-4 ">
      <div className="flex flex-col items-center text-center">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          Featured Products
        </p>
        <div className="w-20 sm:w-28 h-0.5 bg-pink-500 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 mt-10">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              width={600}
              height={600}
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg group-hover:brightness-75 transition duration-300"
            />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 group-hover:-translate-y-3 transition duration-300 text-white space-y-1 sm:space-y-2">
              <p className="font-semibold text-lg sm:text-xl lg:text-2xl">
                {title}
              </p>
              <p className="text-xs sm:text-sm lg:text-base leading-5 max-w-[14rem] sm:max-w-[16rem]">
                {description}
              </p>
              <button className="flex items-center gap-1.5 bg-pink-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded text-xs sm:text-sm lg:text-base">
                Buy now
                <Image
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  src={assets.redirect_icon}
                  alt="Redirect Icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
