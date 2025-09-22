"use client";
import React, { forwardRef } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const ImageUpload = forwardRef(
  (
    {
      value = [], // array of File
      onImageSelect,
      error,
      maxSize = 5,
      maxFiles = 4,
      multiple = true,
      accept = "image/*",
      placeholder = "Click to upload",
      showPreview = true,
      className,
    },
    ref
  ) => {
    const handleChange = (e) => {
      const files = Array.from(e.target.files || []);

      if (!files.length) return;

      // validate max files
      const newFiles = [...value, ...files].slice(0, maxFiles);

      // validate size & type
      const validFiles = newFiles.filter(
        (file) =>
          file.size <= maxSize * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            file.type
          )
      );

      onImageSelect(validFiles);
      e.target.value = ""; // clear input
    };

    const handleRemove = (index) => {
      const updated = value.filter((_, i) => i !== index);
      onImageSelect(updated);
    };

    return (
      <div>
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-pink-400 transition",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            ref={ref}
          />
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">{placeholder}</p>
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        {showPreview && value?.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {value.map((file, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border rounded-lg overflow-hidden bg-gray-50"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";
