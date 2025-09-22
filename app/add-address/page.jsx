"use client";
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { InputField } from "@/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/schemas/categories.schema";
import { addressSchema } from "@/schemas/address.schema";
import { useAddAddress } from "@/hooks/address.hook";
import { useQuery } from "@tanstack/react-query";
import { checkAuthUser } from "@/services/auth.services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddAddress = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user-info"],
    queryFn: checkAuthUser,
  });

  const userData = data || {};
  const id = userData.id;

  const { mutate: addressDetails, isPending, isError, error } = useAddAddress();

  const onSubmit = (data) => {
    addressDetails(
      { ...data, userId: id },
      {
        onSuccess: () => {
          toast.success("Address created successfully");
          router.push("/cart");
          reset();
        },
        onError: (error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        },
      }
    );
  };
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {isError && <span>{error.message}</span>}
          <p className="text-2xl md:text-3xl text-gray-500">
            Add Shipping
            <span className="font-semibold text-pink-600">Address</span>
          </p>
          <div className="space-y-3 max-w-sm mt-10">
            <InputField
              label="Address"
              name="address"
              type="text"
              register={register}
              error={errors.address?.message}
            />
            <InputField
              label="City"
              name="city"
              type="text"
              register={register}
              error={errors.city?.message}
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              type="text"
              register={register}
              error={errors.postalCode?.message}
            />
            <InputField
              label="Country"
              name="country"
              type="text"
              register={register}
              error={errors.country?.message}
            />
          </div>
          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-pink-600 text-white py-3 hover:bg-pink-700 "
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? "Saving...." : "Save address"}
          </button>
        </form>
        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="my_location_image"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
