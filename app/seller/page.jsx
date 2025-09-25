"use client";
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import { InputField } from "@/components/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { productSchema } from "@/schemas/product.schema";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category.services";
import { useAddProduct } from "@/hooks/product.hook";
import toast from "react-hot-toast";
import { ImageUpload } from "@/components/multiple-image-upload";
import { SizeSelector } from "@/components/sizeSelector";
import { ColorSelector } from "@/components/colorSelector";
import { RatingSelector } from "@/components/ratingsSelector";
import { LoaderCircle } from "lucide-react";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      size: "",
      color: "",
      name: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      brand: "",
      rating: 1,
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });

  const categoryList = data || [];

  const { mutate: addProduct, isPending, error, isError } = useAddProduct();

  const selectedImages = watch("images");

  const selectedSize = watch("size");

  const selectedColor = watch("color");
  const selectedRating = watch("rating");

  const sizes = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const colors = [
    { value: "black", color: "#000000", label: "Black" },
    { value: "white", color: "#FFFFFF", label: "White" },
    { value: "navy", color: "#1e40af", label: "Navy Blue" },
    { value: "red", color: "#dc2626", label: "Red" },
    { value: "green", color: "#16a34a", label: "Forest Green" },
    { value: "pink", color: "#ec4899", label: "Pink" },
    { value: "purple", color: "#8b5cf6", label: "Purple" },
    { value: "yellow", color: "#eab308", label: "Yellow" },
  ];

  const onSubmit = (data) => {
    addProduct(data, {
      onSuccess: () => {
        toast.success("Product created successfully");
        reset({
          size: "",
          color: "",
          name: "",
          category: "",
          description: "",
          price: "",
          quantity: "",
          brand: "",
          rating: 1,
          images: [],
        });
      },
      onError: (error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        {isError && error && (
          <span className="text-rose-500 mt-2 bg-rose-100 border border-rose-500 rounded-lg px-8 py-2 list-disc">
            {error.message}
          </span>
        )}

        <ImageUpload
          value={selectedImages}
          onImageSelect={(files) =>
            setValue("images", files, { shouldValidate: true })
          }
          error={errors?.images?.message}
          maxSize={5}
          placeholder="Upload product images"
          accept="image/*"
          showPreview={true}
          multiple={true}
          maxFiles={4}
        />
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

        <div className="relative">
          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 rounded-md">
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          )}
          <select
            {...register("category")}
            disabled={isLoading}
            className={cn(
              "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              "border-gray-300",
              errors.category && "border-red-500 bg-red-50"
            )}
          >
            <option value="">Select category</option>
            {categoryList?.map((category) => (
              <option key={category.id} value={category.id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}

        {/* Size Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Sizes
            {errors?.size && <span className="text-red-500"> *</span>}
          </label>
          <SizeSelector
            options={sizes}
            value={selectedSize}
            onChange={(value) => setValue("size", value)}
            error={errors?.size?.message}
            disabled={isSubmitting || isPending}
          />
          <p className="mt-1 text-xs text-gray-500">
            Select the sizes available for this product
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Rating
            {errors?.rating && <span className="text-red-500"> *</span>}
          </label>
          <RatingSelector
            value={selectedRating}
            onChange={(value) => setValue("rating", value)}
            disabled={isSubmitting || isPending}
            error={errors?.rating?.message}
          />
        </div>

        {/* Color Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Available Colors
            {errors?.color && <span className="text-red-500"> *</span>}
          </label>
          <ColorSelector
            options={colors}
            value={selectedColor}
            onChange={(value) => setValue("color", value)}
            error={errors?.color?.message}
            disabled={isSubmitting || isPending}
            size="md"
            showLabels={true}
          />
          <p className="mt-1 text-xs text-gray-500">
            Select the colors available for this product
          </p>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <InputField
              label=" Price: $USD"
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

        {/* Selected Values Display */}
        {(selectedSize || selectedColor || selectedRating) && (
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Selected Options:
            </h4>
            <div className="flex gap-4 text-sm">
              {selectedSize && (
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded">
                  Size: {selectedSize}
                </span>
              )}
              {selectedColor && (
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{
                      background: colors.find((c) => c.value === selectedColor)
                        ?.color,
                    }}
                  />
                  Color: {colors.find((c) => c.value === selectedColor)?.label}
                </span>
              )}
              {selectedRating && (
                <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded">
                  Rating: {selectedRating}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="px-8 py-2.5 bg-pink-600 text-white font-medium rounded hover:bg-pink-700 transition-colors disabled:opacity-50"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? (
            <LoaderCircle className="animate-spin text-white" />
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
