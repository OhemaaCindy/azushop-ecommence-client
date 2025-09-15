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
import { ShoppingCart, X } from "lucide-react";

const Modal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex gap-2">
        <Image src={assets.user_icon} alt="user icon" />
        Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogCancel className=" self-end border-none">
            <div className="">
              <X className="w-10" />
            </div>
          </AlertDialogCancel>

          <div className="flex flex-col justify-center items-center">
            <div className="text-2xl tracking-wide mb-3 flex gap-2 items-center">
              <ShoppingCart className="text-pink-500" />
              Azu Shop
            </div>

            <p>LogIn To Continue Shopping</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <LoginForm />
        </AlertDialogDescription>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
