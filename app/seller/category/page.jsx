"use client";
import React from "react";
import { InputField } from "@/components/inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/schemas/categories.schema";
import { useAddCategory } from "@/hooks/category.hook";
import toast from "react-hot-toast";
import { SingleImageUpload } from "@/components/single-image-upload";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const { mutate: addCategory, isPending, error, isError } = useAddCategory();

  const selectedImage = watch("image");

  const onSubmit = (data) => {
    addCategory(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image
            {errors.image && <span className="text-red-500">*</span>}
          </label>
          <SingleImageUpload
            value={selectedImage}
            onImageSelect={(file) => setValue("image", file)}
            error={errors.image?.message}
            maxSize={5}
            placeholder="Upload course image"
            accept="image/*"
            showPreview={true}
          />
        </div>

        <InputField
          label="Category Name"
          name="name"
          type="name"
          register={register}
          error={errors.name?.message}
        />
        <button
          type="submit"
          className="px-8 py-2 bg-pink-600 text-white font-medium rounded"
          disabled={isSubmitting || isPending}
        >
          {isSubmitting || isPending ? "Adding..." : " Add"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
