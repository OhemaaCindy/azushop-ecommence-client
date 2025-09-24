"use client";

import { useContext } from "react";
import { Cart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import Footer from "@/components/Footer";
import { InputField } from "@/components/inputs";
import { useAddOrder, usePayOrder } from "@/hooks/order.hook";
import { payorderSchema } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { cart } = useContext(Cart);
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  // console.log("🚀 ~ PaymentPage ~ orderId:", orderId);

  // calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(payorderSchema),
    defaultValues: { paymentMethod: "mobile money" },
  });

  const selectedMethod = watch("paymentMethod");
  // console.log("🚀 ~ PaymentPage ~ selectedMethod:", selectedMethod);

  const { mutate, isPending, isError, error } = usePayOrder();

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const payload = {
      orderId,
      paymentMethod: selectedMethod,
      phone: data.phone,
      callback_url: "http://localhost:3000",
    };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success("Payment successful");
        console.log("Payment response:", res);

        router.push("/order-placed");
      },
      onError: (error) => {
        console.log("🚀 ~ onSubmit ~ error:", error);
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center ">
        {isError && <span>{error.message}</span>}
        <div className="w-[50%]  px-6 md:px-16 lg:px-32 pt-14 mb-20">
          <h1 className="text-2xl font-bold mb-6">Payment</h1>

          {/* Total */}
          <div className="border rounded-lg p-4 shadow-sm bg-white mb-6">
            <p className="text-lg text-gray-600">Total Amount</p>
            <p className="text-2xl font-semibold text-pink-600">
              ${total.toFixed(2)}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border rounded-lg p-6 shadow-sm bg-white space-y-4"
          >
            <h2 className="text-lg font-medium mb-2">Choose Payment Method</h2>

            {/* MoMo */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="mobile money"
                {...register("paymentMethod")}
              />
              <span>Mobile Money</span>
            </label>

            {/* Card */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" value="card" {...register("paymentMethod")} />
              <span>Credit / Debit Card</span>
            </label>

            {/* MoMo Phone Field */}
            {selectedMethod === "mobile money" && (
              <div>
                <InputField
                  label="Mobile Number"
                  name="phone"
                  type="text"
                  register={register}
                  error={errors?.phone?.message}
                />
                {/* {errors?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.phone?.message}
                  </p>
                )} */}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
              disabled={isSubmitting || isPending}
            >
              {isSubmitting || isPending ? "Processing" : "Proceed to Pay"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
