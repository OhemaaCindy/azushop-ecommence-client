import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Icon } from "iconsax-reactjs";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        {/* <div className="flex items-center gap-3">
          <ShoppingCart className="text-pink-500" />
          <div className="text-2xl tracking-wide">Azu Shop</div>
        </div> */}
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="bg-pink-500 text-white rounded-lg h-9 w-9 flex items-center justify-center">
            <Icon size="24" color="#FFFFFF" />
          </div>
        </Link>
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © Azushop All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
          <Image src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#">
          <Image src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#">
          <Image src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
