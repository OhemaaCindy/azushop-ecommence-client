// "use client";

// import { useState } from "react";

// const ProductImages = ({ productData }) => {
//   console.log("🚀 ~ ProductImages ~ productData:", productData);
//   const images = [
//     {
//       id: 1,
//       url: "https://images.pexels.com/photos/1381562/pexels-photo-1381562.jpeg",
//     },
//     {
//       id: 2,
//       url: "https://images.pexels.com/photos/27364755/pexels-photo-27364755.jpeg",
//     },
//     {
//       id: 3,
//       url: "https://images.pexels.com/photos/15249044/pexels-photo-15249044.jpeg",
//     },
//     {
//       id: 4,
//       url: "https://images.pexels.com/photos/33539347/pexels-photo-33539347.jpeg",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   return (
//     <div className="w-full">
//       {/* Main Image */}
//       <div className="h-[500px] w-full">
//         <img
//           src={productData?.images?.[index]}
//           alt="product"
//           className="w-full h-full object-cover rounded-xl shadow-md"
//         />
//       </div>

//       {/* Thumbnails */}
//       <div className="grid grid-cols-4 gap-4 mt-6">
//         {images.map((img, i) => (
//           <button
//             key={img.id}
//             onClick={() => setIndex(i)}
//             className={`relative w-full aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
//               index === i
//                 ? "border-green-600 shadow-md"
//                 : "border-gray-200 hover:border-green-400"
//             }`}
//           >
//             <img
//               src={img.url}
//               alt={`Thumbnail ${i + 1}`}
//               className="w-full h-full object-cover cursor-pointer"
//             />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductImages;

"use client";

import { useState, useEffect } from "react";

const ProductImages = ({ productData }) => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (productData?.images && productData.images.length > 0) {
      setImages(productData.images);
    }
  }, [productData]);

  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="h-[500px] w-full">
        <img
          src={images[index].imageUrl}
          alt={`Product Image ${index + 1}`}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setIndex(i)}
            className={`relative w-full aspect-square rounded-md overflow-hidden border-2 transition-all duration-200 ${
              index === i
                ? "border-pink-500 shadow-md"
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <img
              src={img.imageUrl}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
