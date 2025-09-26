const CustomizedProducts = ({ productData }) => {
  const color = productData.color;
  const size = productData.size;

  return (
    <div className="flex flex-col gap-6">
      {/* Colors */}
      <h4 className="font-medium">Available color</h4>
      <ul className="flex items-center gap-3">
        {color ? (
          <li
            className="w-8 h-8 rounded-full ring-1 ring-gray-100 cursor-pointer"
            style={{ backgroundColor: color.toLowerCase() }}
          ></li>
        ) : (
          <li className="text-gray-400">No color available</li>
        )}
      </ul>

      {/* Sizes */}
      <h4 className="font-medium">Available size</h4>
      <ul className="flex items-center gap-3">
        {size ? (
          <li className="ring-1 ring-pink-200 rounded-md py-2 px-6 text-sm cursor-pointer">
            {size}
          </li>
        ) : (
          <li className="text-gray-400">No size available</li>
        )}
      </ul>
    </div>
  );
};

export default CustomizedProducts;
