import Image from "next/image";
import {
  AlertDialog,
  //   AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { assets } from "@/assets/assets";
import LoginForm from "./loginForm";
import Link from "next/link";
import {
  Boxes,
  House,
  ShoppingBasket,
  ShoppingCart,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import RegisterForm from "./registerForm";
import { useAppContext } from "@/context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "@/hooks/auth.hook";
import { checkAuthUser, logout } from "@/services/auth.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Modal = () => {
  const [mode, setMode] = useState("login");
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const { isSeller, router, userData, isLoadingUser } = useAppContext();
  const { mutate: logout, isPending } = useLogout();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user-info"],
    queryFn: checkAuthUser,
  });

  const userData = data || {};

  // console.log("🚀 ~ Navbar ~ userData:", userData);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {userData.username ? (
        <div>
          <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer border-none outline-none">
              {isLoadingUser && <span>loading...</span>}
              <Image src={assets.user_icon} alt="user icon" />
              <p>{userData.username}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel className="flex items-center gap-10 font-medium">
                <Image src={assets.user_icon} alt="user icon" />
                <p>{userData.username}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <Link href="/">
                <DropdownMenuItem className="flex items-center gap-10 cursor-pointer hover:bg-[#F9C5D5]">
                  <House />
                  <p className="font-normal">Home</p>
                </DropdownMenuItem>
              </Link>
              <Link href="/all-products">
                <DropdownMenuItem className="flex items-center gap-10 cursor-pointer hover:bg-[#F9C5D5]">
                  <ShoppingBasket />
                  <p className="font-normal">Products</p>
                </DropdownMenuItem>
              </Link>
              <Link href="/cart">
                <DropdownMenuItem className="flex items-center gap-10 cursor-pointer hover:bg-[#F9C5D5]">
                  <ShoppingCart />
                  <p className="font-normal">Cart</p>
                </DropdownMenuItem>
              </Link>
              <Link href="/my-orders">
                <DropdownMenuItem className="flex items-center gap-10 cursor-pointer hover:bg-[#F9C5D5]">
                  <Boxes />
                  <p className="font-normal">My Orders</p>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-10 cursor-pointer"
              >
                <LogOut className="text-red-400" />
                <p className="text-red-400">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpenModal(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>

          <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <AlertDialogTrigger
              asChild
              className="flex gap-2"
            ></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogCancel className=" self-end border-none">
                  <div className="">
                    <X className="w-10" />
                  </div>
                </AlertDialogCancel>

                <div className="flex flex-col justify-center items-center">
                  <AlertDialogTitle className="text-2xl tracking-wide mb-3 flex gap-2 items-center">
                    <ShoppingCart className="text-pink-500" />
                    Azu Shop
                  </AlertDialogTitle>

                  <AlertDialogDescription className="text-xl">
                    {mode === "login"
                      ? "Log in to continue shopping"
                      : "Create an account to start shopping"}
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>
              <div>
                {mode === "login" ? (
                  <LoginForm setMode={setMode} setIsModal={setIsOpenModal} />
                ) : (
                  <RegisterForm setMode={setMode} />
                )}
              </div>
              {/* <AlertDialogFooter></AlertDialogFooter> */}
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default Modal;

// import Image from "next/image";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "./ui/alert-dialog";
// import { assets } from "@/assets/assets";
// import LoginForm from "./loginForm";
// import Link from "next/link";
// import {
//   Boxes,
//   House,
//   ShoppingBasket,
//   ShoppingCart,
//   X,
//   LogOut,
//   User,
// } from "lucide-react";
// import { useState, useCallback } from "react";
// import RegisterForm from "./registerForm";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { checkAuthUser, logout } from "@/services/auth.services";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const Modal = () => {
//   const [mode, setMode] = useState("login");
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [isOpenDropdown, setIsOpenDropdown] = useState(false);

//   const queryClient = useQueryClient();

//   // Fetch user data
//   const {
//     data: userData,
//     isLoading: isLoadingUser,
//     error,
//   } = useQuery({
//     queryKey: ["user-info"],
//     queryFn: checkAuthUser,
//     retry: false,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

//   // Logout mutation
//   const logoutMutation = useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       localStorage.removeItem("token");
//       queryClient.clear(); // Clear all cache
//       setIsOpenDropdown(false);
//     },
//     onError: (error) => {
//       console.error("Logout failed:", error);
//       // Still clear local storage and cache even if API call fails
//       localStorage.removeItem("token");
//       queryClient.clear();
//       setIsOpenDropdown(false);
//     },
//   });

//   const handleLogout = useCallback(() => {
//     logoutMutation.mutate();
//   }, [logoutMutation]);

//   const handleModalClose = useCallback(() => {
//     setIsOpenModal(false);
//     setMode("login"); // Reset to login mode when modal closes
//   }, []);

//   const handleDropdownItemClick = useCallback(() => {
//     setIsOpenDropdown(false);
//   }, []);

//   // Loading state
//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center gap-2">
//         <div className="w-6 h-6 animate-pulse bg-gray-300 rounded-full" />
//         <div className="w-16 h-4 animate-pulse bg-gray-300 rounded" />
//       </div>
//     );
//   }

//   // Error state - treat as unauthenticated
//   if (error && !userData) {
//     console.warn("Failed to fetch user data:", error);
//   }

//   return (
//     <>
//       {userData?.username ? (
//         <div>
//           <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
//             <DropdownMenuTrigger
//               className="flex items-center gap-2 cursor-pointer border-none outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-1"
//               aria-label={`User menu for ${userData.username}`}
//             >
//               <Image
//                 src={assets.user_icon}
//                 alt="User avatar"
//                 width={24}
//                 height={24}
//                 className="rounded-full"
//               />
//               <span className="truncate max-w-24">{userData.username}</span>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent className="w-60" align="end">
//               <DropdownMenuLabel className="flex items-center gap-3 font-medium p-3">
//                 <Image
//                   src={assets.user_icon}
//                   alt="User avatar"
//                   width={32}
//                   height={32}
//                   className="rounded-full"
//                 />
//                 <div className="flex flex-col">
//                   <span className="font-semibold truncate">
//                     {userData.username}
//                   </span>
//                   {userData.email && (
//                     <span className="text-sm text-gray-500 truncate">
//                       {userData.email}
//                     </span>
//                   )}
//                 </div>
//               </DropdownMenuLabel>

//               <DropdownMenuSeparator />

//               <Link href="/" onClick={handleDropdownItemClick}>
//                 <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 focus:bg-pink-50">
//                   <House size={16} />
//                   <span>Home</span>
//                 </DropdownMenuItem>
//               </Link>

//               <Link href="/all-products" onClick={handleDropdownItemClick}>
//                 <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 focus:bg-pink-50">
//                   <ShoppingBasket size={16} />
//                   <span>Products</span>
//                 </DropdownMenuItem>
//               </Link>

//               <Link href="/cart" onClick={handleDropdownItemClick}>
//                 <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 focus:bg-pink-50">
//                   <ShoppingCart size={16} />
//                   <span>Cart</span>
//                 </DropdownMenuItem>
//               </Link>

//               <Link href="/my-orders" onClick={handleDropdownItemClick}>
//                 <DropdownMenuItem className="flex items-center gap-3 cursor-pointer hover:bg-pink-50 focus:bg-pink-50">
//                   <Boxes size={16} />
//                   <span>My Orders</span>
//                 </DropdownMenuItem>
//               </Link>

//               <DropdownMenuSeparator />

//               <DropdownMenuItem
//                 onClick={handleLogout}
//                 disabled={logoutMutation.isPending}
//                 className="flex items-center gap-3 cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-600 hover:text-red-700"
//               >
//                 <LogOut
//                   size={16}
//                   className={logoutMutation.isPending ? "animate-spin" : ""}
//                 />
//                 <span>
//                   {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
//                 </span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       ) : (
//         <>
//           <button
//             onClick={() => setIsOpenModal(true)}
//             className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
//             aria-label="Open account login/signup modal"
//           >
//             <User size={20} />
//             <span>Account</span>
//           </button>

//           <AlertDialog open={isOpenModal} onOpenChange={handleModalClose}>
//             <AlertDialogTrigger asChild className="hidden" />

//             <AlertDialogContent className="max-w-md">
//               <AlertDialogHeader className="relative">
//                 <AlertDialogCancel
//                   className="absolute -top-2 -right-2 border-none bg-transparent hover:bg-gray-100 p-2 h-auto w-auto"
//                   aria-label="Close modal"
//                 >
//                   <X size={20} />
//                 </AlertDialogCancel>

//                 <div className="flex flex-col justify-center items-center pt-4">
//                   <AlertDialogTitle className="text-2xl tracking-wide mb-3 flex gap-2 items-center">
//                     <ShoppingCart className="text-pink-500" size={28} />
//                     Azu Shop
//                   </AlertDialogTitle>

//                   <AlertDialogDescription className="text-lg text-center text-gray-600">
//                     {mode === "login"
//                       ? "Welcome back! Sign in to continue shopping"
//                       : "Join Azu Shop and start your shopping journey"}
//                   </AlertDialogDescription>
//                 </div>
//               </AlertDialogHeader>

//               <div className="mt-4">
//                 {mode === "login" ? (
//                   <LoginForm
//                     setMode={setMode}
//                     setIsModal={setIsOpenModal}
//                     onSuccess={() => {
//                       queryClient.invalidateQueries({
//                         queryKey: ["user-info"],
//                       });
//                       setIsOpenModal(false);
//                     }}
//                   />
//                 ) : (
//                   <RegisterForm
//                     setMode={setMode}
//                     onSuccess={() => {
//                       queryClient.invalidateQueries({
//                         queryKey: ["user-info"],
//                       });
//                       setIsOpenModal(false);
//                     }}
//                   />
//                 )}
//               </div>
//             </AlertDialogContent>
//           </AlertDialog>
//         </>
//       )}
//     </>
//   );
// };

// export default Modal;
