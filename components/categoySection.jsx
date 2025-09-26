"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/category.services";
import { useRouter } from "next/navigation";

const ShopByCategories = () => {
  const [discovery, setDiscovery] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  const categories = data || [];

  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockDiscovery = {
        title: "Discovery",
        subtitle: "all new items",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      };

      setDiscovery(mockDiscovery);
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    if (categories.length === 0) return;
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, categories.length - 3);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    if (categories.length === 0) return;
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, categories.length - 3);
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const getVisibleCategories = () => {
    if (categories.length === 0) return [];

    const visible = [];
    const startIndex = currentIndex;
    const endIndex = Math.min(startIndex + 3, categories.length);

    for (let i = startIndex; i < endIndex; i++) {
      visible.push(categories[i]);
    }

    return visible;
  };

  if (isLoading) {
    return (
      <div className="w-full px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const visibleCategories = getVisibleCategories();
  const hasMultipleSlides = categories.length > 3;

  const handleNavigation = () => {
    router.push("/all-products");
  };

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={prevSlide}
          disabled={!hasMultipleSlides}
          className={`p-2 rounded-full border border-gray-300 transition-colors ${
            hasMultipleSlides
              ? "hover:bg-gray-50 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextSlide}
          disabled={!hasMultipleSlides}
          className={`p-2 rounded-full border border-gray-300 transition-colors ${
            hasMultipleSlides
              ? "hover:bg-gray-50 cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
          aria-label="Next categories"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-medium text-gray-900 [font-family:var(--font-playfair)]">
          SHOP BY CATEGORIES
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ease-in-out">
        {/* Category Items - Show visible categories based on current index */}
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer"
            onClick={() => console.log(`Navigate to ${category?.name}`)}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4 group-hover:scale-105 transition-all duration-300 ease-in">
              <img
                src={category?.imageUrl}
                alt={category?.name}
                className="w-full h-full object-cover transition-transform duration-150 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
              {category?.name}
            </h3>
          </div>
        ))}

        {/* Discovery Section - Always show if discovery exists */}
        {discovery && (
          <div className="group cursor-pointer" onClick={handleNavigation}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gray-200 mb-4 group-hover:border-gray-300 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                <h3 className="text-2xl font-light text-gray-900 mb-2">
                  {discovery.title}
                </h3>
                <p className="text-gray-600 mb-6">{discovery.subtitle}</p>
                <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-colors group-hover:border-gray-400">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Carousel Indicators */}
      {hasMultipleSlides && (
        <div className="flex justify-center mt-8 gap-2 lg:hidden">
          {Array.from({ length: Math.ceil(categories.length / 3) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 3)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 3) === i
                    ? "bg-gray-900"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ShopByCategories;
