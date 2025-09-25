// "use client";

// import React, { useContext, useState } from "react";
// import { assets } from "@/assets/assets";
// import Link from "next/link";
// import { useAppContext } from "@/context/AppContext";
// import Image from "next/image";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import Modal from "./modal";
// import { useQuery } from "@tanstack/react-query";
// import { checkAuthUser } from "@/services/auth.services";
// import { useRouter } from "next/navigation";
// import CartModal from "./cartModal";
// import { Cart } from "@/context/CartContext";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter();
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const { cart } = useContext(Cart);

//   const { data, isLoading } = useQuery({
//     queryKey: ["user-info"],
//     queryFn: checkAuthUser,
//   });
//   const userData = !isLoading && data ? data : null;
//   const isAdmin = userData ? userData.role === "ADMIN" : false;
//   const disable = isLoading || !data;

//   const navLinkClasses =
//     "relative hover:text-gray-900 transition before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-pink-500 before:transition-all before:duration-300 hover:before:w-[40px]";

//   return (
//     <nav className="border-b border-gray-300 text-gray-700">
//       <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3">
//           <ShoppingCart className="text-pink-500" />
//           <div className="text-2xl tracking-wide">Azu Shop</div>
//         </Link>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-6 lg:gap-10">
//           <Link href="/" className={navLinkClasses}>
//             Home
//           </Link>
//           <Link href="/all-products" className={navLinkClasses}>
//             Shop
//           </Link>
//           <Link href="/" className={navLinkClasses}>
//             About Us
//           </Link>
//           <Link href="/" className={navLinkClasses}>
//             Contact
//           </Link>
//           {isAdmin && (
//             <button
//               onClick={() => router.push("/seller")}
//               disabled={disable}
//               className="text-xs border px-4 py-1.5 rounded-full"
//             >
//               Seller Dashboard
//             </button>
//           )}
//         </div>

//         {/* Desktop Icons */}
//         <ul className="hidden md:flex items-center gap-4">
//           <Image
//             className="w-4 h-4"
//             src={assets.search_icon}
//             alt="search icon"
//           />
//           <Modal userData={userData} isLoading={isLoading} />

//           <li className="relative">
//             <button
//               onClick={() => setIsCartOpen(!isCartOpen)}
//               className="relative"
//             >
//               <ShoppingCart size={24} />
//               <div className="absolute -top-4 -right-4 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-sm flex items-center justify-center">
//                 {cart.length}
//               </div>
//             </button>

//             {isCartOpen && <CartModal />}
//           </li>
//         </ul>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center gap-3">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="flex flex-col gap-4 px-6 py-4 border-t bg-white md:hidden">
//           <Link
//             href="/"
//             className={navLinkClasses}
//             onClick={() => setIsOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             href="/all-products"
//             className={navLinkClasses}
//             onClick={() => setIsOpen(false)}
//           >
//             Shop
//           </Link>
//           <Link
//             href="/"
//             className={navLinkClasses}
//             onClick={() => setIsOpen(false)}
//           >
//             About Us
//           </Link>
//           <Link
//             href="/"
//             className={navLinkClasses}
//             onClick={() => setIsOpen(false)}
//           >
//             Contact
//           </Link>

//           {isAdmin && (
//             <button
//               onClick={() => {
//                 router.push("/seller");
//                 setIsOpen(false);
//               }}
//               disabled={disable}
//               className="text-xs border px-4 py-1.5 rounded-full"
//             >
//               Seller Dashboard
//             </button>
//           )}

//           {/* Mobile Icons */}
//           <div className="flex items-center gap-4 pt-2">
//             <Image
//               className="w-4 h-4"
//               src={assets.search_icon}
//               alt="search icon"
//             />
//             <Modal userData={userData} isLoading={isLoading} />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import React, { useContext, useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
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
  const { cart, getCartItemCount } = useContext(Cart);

  const { data, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: checkAuthUser,
  });
  const userData = !isLoading && data ? data : null;
  const isAdmin = userData ? userData.role === "ADMIN" : false;
  const disable = isLoading || !data;

  const navLinkClasses =
    "relative hover:text-gray-900 transition-all duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-pink-500 before:transition-all before:duration-300 hover:before:w-full";

  const mobileNavLinkClasses =
    "block py-2 px-4 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200 rounded-lg";

  return (
    <nav className="border-b border-gray-300 text-gray-700 sticky top-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <ShoppingCart className="text-pink-500 w-6 h-6 sm:w-7 sm:h-7" />
          <div className="text-xl sm:text-2xl tracking-wide font-semibold">
            Azu Shop
          </div>
        </Link>

        {/* Desktop Links - Hidden on tablet and mobile */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
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
              className="text-xs border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop Icons - Hidden on mobile */}
        <ul className="hidden md:flex items-center gap-3 lg:gap-4">
          <li>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </li>
          <li>
            <Modal userData={userData} isLoading={isLoading} />
          </li>
          <li className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-xs flex items-center justify-center font-medium">
                  {getCartItemCount ? getCartItemCount() : cart.length}
                </div>
              )}
            </button>
            {isCartOpen && <CartModal />}
          </li>
        </ul>

        {/* Mobile Icons - Cart + Menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Cart */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F35C7A] rounded-full text-white text-xs flex items-center justify-center font-medium">
                {getCartItemCount ? getCartItemCount() : cart.length}
              </div>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Cart Modal */}
      {isCartOpen && (
        <div className="md:hidden">
          <CartModal />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {/* Navigation Links */}
            <Link
              href="/"
              className={mobileNavLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/all-products"
              className={mobileNavLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/"
              className={mobileNavLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/"
              className={mobileNavLinkClasses}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* Admin Dashboard */}
            {isAdmin && (
              <button
                onClick={() => {
                  router.push("/seller");
                  setIsOpen(false);
                }}
                disabled={disable}
                className="block w-full text-left py-2 px-4 text-xs border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-2"
              >
                Seller Dashboard
              </button>
            )}

            {/* Mobile Actions */}
            <hr className="my-4 border-gray-200" />

            <div className="flex items-center justify-between px-4">
              {/* Search */}
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Search className="w-4 h-4" />
                <span className="text-sm">Search</span>
              </button>

              {/* User Account */}
              <div onClick={() => setIsOpen(false)}>
                <Modal userData={userData} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
