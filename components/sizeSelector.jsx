"use client";
import React from "react";

import { cn } from "@/lib/utils";

import { Check } from "lucide-react";

export const SizeSelector = ({
  options = [],
  value,
  onChange,
  name = "size",
  className = "",
  error,
  disabled = false,
  layout = "horizontal", // "horizontal" or "vertical"
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={cn(
          "flex gap-2",
          layout === "vertical" ? "flex-col" : "flex-wrap"
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={cn(
                "relative flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer transition-all duration-200 min-w-[3rem] text-center",
                isSelected
                  ? "border-pink-500 bg-pink-50 text-pink-700"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400",
                isDisabled
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : "hover:shadow-sm",
                error && "border-red-300"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onChange(e.target.value)}
                disabled={isDisabled}
                className="sr-only"
              />

              <span className="text-sm font-medium">
                {option.label || option.value}
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}

              {/* Out of stock overlay */}
              {option.outOfStock && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium transform -rotate-12">
                    OUT OF STOCK
                  </span>
                </div>
              )}
            </label>
          );
        })}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
