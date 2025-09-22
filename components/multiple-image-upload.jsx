// import React, {
//   useState,
//   useRef,
//   useCallback,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { Upload, X, FileImage, Plus } from "lucide-react";
// import { cn } from "@/lib/utils";

// export const ImageUpload = forwardRef(
//   (
//     {
//       onImageSelect,
//       accept = "image/*",
//       maxSize = 5,
//       className = "",
//       placeholder = "Click to upload images or drag and drop",
//       showPreview = true,
//       disabled = false,
//       error,
//       tempPreviewUrl,
//       value,
//       profile = false,
//       multiple = true, // allow multiple
//       maxFiles = 4, // maximum number of files
//     },
//     ref
//   ) => {
//     const [previews, setPreviews] = useState(() => {
//       if (multiple) {
//         return tempPreviewUrl ? [tempPreviewUrl] : [];
//       }
//       return tempPreviewUrl ? [tempPreviewUrl] : [];
//     });

//     const [isDragging, setIsDragging] = useState(false);
//     const [uploadError, setUploadError] = useState("");
//     const fileInputRef = useRef(null);

//     useImperativeHandle(ref, () => ({
//       clear: () => {
//         setPreviews([]);
//         setUploadError("");
//         if (fileInputRef.current) {
//           fileInputRef.current.value = "";
//         }
//       },
//     }));

//     const validateFile = useCallback(
//       (file) => {
//         if (!file.type.startsWith("image/")) {
//           return "Please select a valid image file";
//         }
//         const fileSizeMB = file.size / (1024 * 1024);
//         if (fileSizeMB > maxSize) {
//           return `File size must be less than ${maxSize}MB`;
//         }
//         return null;
//       },
//       [maxSize]
//     );

//     const handleFileSelect = useCallback(
//       (files) => {
//         const fileArray = Array.from(files);

//         if (multiple) {
//           if (previews.length + fileArray.length > maxFiles) {
//             setUploadError(`Maximum ${maxFiles} files allowed`);
//             return;
//           }
//         } else {
//           fileArray.splice(1);
//         }

//         const validFiles = [];
//         const errors = [];

//         fileArray.forEach((file) => {
//           const validationError = validateFile(file);
//           if (validationError) {
//             errors.push(validationError);
//           } else {
//             validFiles.push(file);
//           }
//         });

//         if (errors.length > 0) {
//           setUploadError(errors[0]);
//           return;
//         }

//         setUploadError("");

//         validFiles.forEach((file) => {
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             const newPreview = {
//               url: e.target?.result,
//               file,
//               id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, // ✅ unique key
//             };

//             if (multiple) {
//               setPreviews((prev) => [...prev, newPreview]);
//             } else {
//               setPreviews([newPreview]);
//             }
//           };
//           reader.readAsDataURL(file);
//         });

//         if (multiple) {
//           onImageSelect([...previews.map((p) => p.file), ...validFiles]);
//         } else {
//           onImageSelect(validFiles[0]);
//         }
//       },
//       [validateFile, onImageSelect, multiple, maxFiles, previews]
//     );

//     const handleInputChange = (e) => {
//       const files = e.target.files;
//       if (files && files.length > 0) {
//         handleFileSelect(files);
//       }
//     };

//     const handleDragOver = (e) => {
//       e.preventDefault();
//       if (!disabled) setIsDragging(true);
//     };

//     const handleDragLeave = (e) => {
//       e.preventDefault();
//       setIsDragging(false);
//     };

//     const handleDrop = (e) => {
//       e.preventDefault();
//       setIsDragging(false);
//       if (disabled) return;
//       const files = e.dataTransfer.files;
//       if (files && files.length > 0) {
//         handleFileSelect(files);
//       }
//     };

//     const handleRemove = (indexToRemove) => {
//       let updated = [];
//       if (multiple) {
//         updated = previews.filter((_, index) => index !== indexToRemove);
//         setPreviews(updated);
//       } else {
//         setPreviews([]);
//       }
//       setUploadError("");
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       if (multiple) {
//         onImageSelect(updated.map((p) => p.file));
//       } else {
//         onImageSelect(null);
//       }
//     };

//     const handleClick = () => {
//       if (!disabled) {
//         fileInputRef.current?.click();
//       }
//     };

//     const displayError = error || uploadError;

//     // 🔄 sync previews with value prop if passed
//     React.useEffect(() => {
//       if (value) {
//         if (multiple && Array.isArray(value)) {
//           const newPreviews = [];
//           value.forEach((file, index) => {
//             if (file instanceof File) {
//               const reader = new FileReader();
//               reader.onload = (e) => {
//                 newPreviews.push({
//                   url: e.target?.result,
//                   file: file,
//                   id:
//                     crypto.randomUUID?.() ||
//                     `${Date.now()}-${index}-${Math.random()}`, // ✅ unique
//                 });
//                 if (newPreviews.length === value.length) {
//                   setPreviews(newPreviews);
//                 }
//               };
//               reader.readAsDataURL(file);
//             }
//           });
//         } else if (!multiple && value instanceof File) {
//           const reader = new FileReader();
//           reader.onload = (e) => {
//             setPreviews([
//               {
//                 url: e.target?.result,
//                 file: value,
//                 id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, // ✅ unique
//               },
//             ]);
//           };
//           reader.readAsDataURL(value);
//         }
//       } else if (!value) {
//         setPreviews([]);
//       }
//     }, [value, multiple]);

//     return (
//       <div className={`w-full ${className}`}>
//         <div
//           onClick={handleClick}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           className={cn(
//             "relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer",
//             isDragging && !disabled
//               ? "border-blue-400 bg-blue-50"
//               : displayError
//               ? "border-red-300 bg-red-50"
//               : "border-gray-300 hover:border-gray-400 bg-gray-50",
//             disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
//           )}
//         >
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept={accept}
//             onChange={handleInputChange}
//             disabled={disabled}
//             multiple={multiple}
//             className="hidden"
//           />

//           {previews.length > 0 && showPreview ? (
//             <div className="p-4">
//               {multiple ? (
//                 <>
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//                     {previews.map((preview, index) => (
//                       <div key={preview.id} className="relative group">
//                         <img
//                           src={preview.url}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-24 object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRemove(index);
//                           }}
//                           disabled={disabled}
//                           className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
//                         >
//                           <X size={12} />
//                         </button>
//                       </div>
//                     ))}

//                     {previews.length < maxFiles && (
//                       <div
//                         onClick={handleClick}
//                         className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
//                       >
//                         <Plus className="w-6 h-6 text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-xs text-gray-500 text-center">
//                     {previews.length} of {maxFiles} images selected
//                   </p>
//                 </>
//               ) : (
//                 <div className="relative">
//                   <img
//                     src={previews[0].url}
//                     alt="Preview"
//                     className="max-h-64 mx-auto rounded-lg object-contain"
//                   />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemove(0);
//                     }}
//                     disabled={disabled}
//                     className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors cursor-pointer"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center p-8 text-center">
//               <div
//                 className={`mb-4 p-3 rounded-full ${
//                   displayError ? "bg-red-100" : "bg-gray-200"
//                 }`}
//               >
//                 {displayError ? (
//                   <FileImage className="w-8 h-8 text-red-500" />
//                 ) : (
//                   <Upload className="w-8 h-8 text-gray-500" />
//                 )}
//               </div>
//               <p className="text-sm text-gray-600 mb-1">{placeholder}</p>
//               <p className="text-xs text-gray-400">
//                 Supports: JPG, PNG, GIF up to {maxSize}MB • Max {maxFiles} files
//               </p>
//             </div>
//           )}
//         </div>
//         {displayError && (
//           <p className="mt-2 text-sm text-red-600">{displayError}</p>
//         )}
//       </div>
//     );
//   }
// );

// ImageUpload.displayName = "ImageUpload";

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
