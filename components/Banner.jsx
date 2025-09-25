import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();

  const handeRoute = () => {
    router.push("/all-products");
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-10 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-56"
        src="/bannerImg.png"
        alt="banner_image"
        width={600}
        height={200}
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[400px]">
          {/* Where Fashion Becomes You. */}
          Elevate Your Everyday Style.
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60">
          {/* From immersive sound to precise controls everything you need to win
           */}
          Discover outfits that blend comfort, elegance, and confidence in every
          step.
        </p>
        <button
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-pink-600 rounded text-white"
          onClick={handeRoute}
        >
          Shop the Collection
          <Image
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>

      <Image
        className="max-w-56"
        src="/suit.png"
        alt="banner_image"
        width={600}
        height={200}
      />
    </div>
  );
};

export default Banner;
