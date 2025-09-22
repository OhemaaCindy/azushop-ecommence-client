"use client";
import React from "react";

import { cn } from "@/lib/utils";

import { Check } from "lucide-react";
// Color Radio Button Component
export const ColorSelector = ({
  options = [],
  value,
  onChange,
  name = "color",
  className = "",
  error,
  disabled = false,
  showLabels = true,
  size = "md", // "sm", "md", "lg"
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <div
              key={option.value}
              className="flex flex-col items-center gap-1"
            >
              <label
                className={cn(
                  "relative rounded-full cursor-pointer transition-all duration-200 border-2",
                  sizeClasses[size],
                  isSelected
                    ? "border-gray-800 ring-2 ring-pink-500 ring-offset-2"
                    : "border-gray-300 hover:border-gray-400",
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105",
                  error && "border-red-300"
                )}
                title={option.label || option.value}
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

                {/* Color display */}
                <div
                  className={cn(
                    "w-full h-full rounded-full",
                    option.gradient ? "" : "border border-gray-200"
                  )}
                  style={{
                    background: option.gradient || option.color || option.value,
                  }}
                />

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full shadow-md flex items-center justify-center">
                      <Check size={8} className="text-gray-800" />
                    </div>
                  </div>
                )}

                {/* Out of stock overlay */}
                {option.outOfStock && (
                  <div className="absolute inset-0 bg-gray-200 bg-opacity-75 rounded-full flex items-center justify-center">
                    <div className="w-1 h-full bg-red-500 transform rotate-45"></div>
                  </div>
                )}
              </label>

              {/* Color label */}
              {showLabels && (
                <span
                  className={cn(
                    "text-xs text-center max-w-[4rem] truncate",
                    isSelected ? "text-pink-700 font-medium" : "text-gray-600",
                    isDisabled && "text-gray-400"
                  )}
                >
                  {option.label || option.value}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
