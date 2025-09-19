"use client";

import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import Modal from "./modal";
import { useQuery } from "@tanstack/react-query";
import { checkAuthUser } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // const { isSeller, router } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: checkAuthUser,
  });
  const userData = !isLoading && data ? data : null;
  const isAdmin = userData ? userData.role === "ADMIN" : false;
  const disable = isLoading || !data;
  console.log("🔥🔥 ~ Navbar ~ userData:", userData);
  console.log("🔥🔥 ~ Navbar ~ isAdmin:", isAdmin);

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
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
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
          <Modal />
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
            className="hover:text-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/"
            className="hover:text-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/"
            className="hover:text-gray-900 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {/* {isLoadingUser && <span>loading user...</span>} */}

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
            <Modal />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
