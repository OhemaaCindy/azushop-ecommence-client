"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { InputField } from "@/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { productSchema } from "@/schemas/product.schema";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category.services";
import { useAddProduct } from "@/hooks/product.hook";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });

  const categoryList = data || [];

  const { mutate: addProduct, isPending, error, isError } = useAddProduct();

  const onSubmit = (data) => {
    addProduct(data, {
      onSuccess: () => {
        toast.success("Product created successfully");
        reset();
      },
      onError: (error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {isError && error && (
        <span className="text-rose-500 mt-2 bg-rose-100 border border-rose-500 rounded-lg px-8 py-2 list-disc">
          {error.message}
        </span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <InputField
          label="Product Name"
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
        />

        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            name="description"
            rows={4}
            className={cn(
              "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-transparent outline-none resize-none bg-gray-50",
              errors.category && "border-red-500 bg-red-50"
            )}
            placeholder="Type here..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <select
          {...register("category")}
          className={cn(
            "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            "border-gray-300",
            errors.category && "border-red-500 bg-red-50"
          )}
        >
          <option value="">Select category</option>
          {isLoading ? (
            <div>Loading categories....</div>
          ) : (
            categoryList?.map((category) => (
              <option key={category.id} value={category.id}>
                {category?.name}
              </option>
            ))
          )}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <InputField
              label="Product Price: $USD"
              name="price"
              type="number"
              register={register}
              error={errors.price?.message}
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              register={register}
              error={errors.quantity?.message}
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <InputField
              label="Brand"
              name="brand"
              type="text"
              register={register}
              error={errors.brand?.message}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 bg-pink-600 text-white font-medium rounded"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
