import React from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Icon } from "iconsax-reactjs";

const Navbar = () => {
  const { router } = useAppContext();

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      {/* <Image onClick={()=>router.push('/')} className='w-28 lg:w-32 cursor-pointer' src={assets.logo} alt="" /> */}
      {/* <Link href="/" className="flex items-center gap-3">
        <ShoppingCart className="text-pink-500" />
        <div className="text-2xl tracking-wide">Azu Shop</div>
      </Link> */}
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <div className="bg-pink-500 text-white rounded-lg h-9 w-9 flex items-center justify-center">
          <Icon size="24" color="#FFFFFF" />
        </div>
        <div className="text-2xl tracking-wide">Azu Shop</div>
      </Link>
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
