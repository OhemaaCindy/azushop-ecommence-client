"use client";

import React, { useContext, useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import Modal from "./modal";
import { useQuery } from "@tanstack/react-query";
import { checkAuthUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import CartModal from "./cartModal";
import { Cart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useContext(Cart);

  const { data, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: checkAuthUser,
  });
  const userData = !isLoading && data ? data : null;
  const isAdmin = userData ? userData.role === "ADMIN" : false;
  const disable = isLoading || !data;

  const navLinkClasses =
    "relative hover:text-gray-900 transition before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-pink-500 before:transition-all before:duration-300 hover:before:w-full";

  return (
    <nav className="border-b border-gray-300 text-gray-700">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <ShoppingCart className="text-pink-500" />
          <div className="text-2xl tracking-wide">Azu Shop</div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link href="/" className={navLinkClasses}>
            Home
          </Link>
          <Link href="/all-products" className={navLinkClasses}>
            Shop
          </Link>
          <Link href="/" className={navLinkClasses}>
            About Us
          </Link>
          <Link href="/" className={navLinkClasses}>
            Contact
          </Link>
          {isAdmin && (
            <button
              onClick={() => router.push("/seller")}
              disabled={disable}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop Icons */}
        <ul className="hidden md:flex items-center gap-4">
          <Image
            className="w-4 h-4"
            src={assets.search_icon}
            alt="search icon"
          />
          <Modal userData={userData} isLoading={isLoading} />

          <li className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <ShoppingCart size={24} />
              <div className="absolute -top-4 -right-4 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center">
                {cart.length}
              </div>
            </button>

            {isCartOpen && <CartModal />}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="flex flex-col gap-4 px-6 py-4 border-t bg-white md:hidden">
          <Link
            href="/"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/all-products"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/"
            className={navLinkClasses}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          {isAdmin && (
            <button
              onClick={() => {
                router.push("/seller");
                setIsOpen(false);
              }}
              disabled={disable}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 pt-2">
            <Image
              className="w-4 h-4"
              src={assets.search_icon}
              alt="search icon"
            />
            <Modal userData={userData} isLoading={isLoading} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
