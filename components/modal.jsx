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
import { Icon } from "iconsax-reactjs";

const Modal = ({ userData, isLoading }) => {
  // console.log("🚀 ~ Modal ~ userData:", userData);
  const [mode, setMode] = useState("login");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { mutate: logout, isPending } = useLogout();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {userData?.username ? (
        <div>
          <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer border-none outline-none">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  {/* Circle for user icon */}
                  <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                  {/* Rectangle for username */}
                  <div className="w-24 h-4 rounded-full bg-gray-200 animate-pulse" />
                </div>
              ) : userData ? (
                <>
                  <Image src={assets.user_icon} alt="user icon" />
                  <p>{userData.username}</p>
                </>
              ) : (
                <>
                  <Image src={assets.user_icon} alt="user icon" />
                  <p>Account</p>
                </>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel className="flex items-center gap-10 font-medium">
                <Image src={assets.user_icon} alt="user icon" />
                <p>{userData?.username}</p>
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
                disabled={isPending}
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
                    {/* <ShoppingCart className="text-pink-500" /> */}
                    <div className="bg-pink-500 text-white rounded-lg h-9 w-9 flex items-center justify-center">
                      <Icon size="24" color="#FFFFFF" />
                    </div>
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
