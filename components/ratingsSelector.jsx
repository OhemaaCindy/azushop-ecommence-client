import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const RatingSelector = ({
  value = 0,
  onChange,
  max = 5,
  disabled = false,
  error,
  name = "rating",
}) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        const isActive = ratingValue <= value;

        return (
          <button
            key={ratingValue}
            type="button"
            disabled={disabled}
            onClick={() => onChange(ratingValue)}
            className={cn(
              "p-1 transition-transform",
              disabled ? "cursor-not-allowed opacity-50" : "hover:scale-110"
            )}
          >
            <Star
              size={22}
              className={cn(
                isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          </button>
        );
      })}
      {error && <p className="ml-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
