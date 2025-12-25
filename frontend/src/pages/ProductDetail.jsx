import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Uncomment if using Redux
import { toast } from "react-toastify";
import { addToCart } from "../redux/userSlice";

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = location.state || null;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          Product data is missing. This usually happens when you refresh the detail page directly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const data = JSON.parse(localStorage.getItem("user"));

  const handleAddToCart = (product) => {
    product.quantity = quantity;
    toast.success(`Added ${quantity} item(s) to cart!`);
    dispatch(addToCart(product, setQuantity));
  };

  const handleBuyNow = () => {
    toast.success("Proceeding to Buy Now checkout...");
  };

  const incrementQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-200">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-contain w-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col space-y-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium uppercase text-xs">
              {product.category || "General"}
            </span>
            <span className="flex items-center text-yellow-600 font-bold">
              ★ {product.rating?.rate || "4.5"}
              <span className="text-gray-400 font-normal ml-1">
                ({product.rating?.count || 120} reviews)
              </span>
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Price Section */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-green-600">${product.price}</span>
            {/* Mock original price for discount effect */}
            <span className="text-lg text-gray-400 line-through mb-1">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description ||
              "This is a high-quality product that fits your needs perfectly. Designed with durability and style in mind."}
          </p>

          <hr className="border-gray-200 my-4" />

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decrementQty}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                -
              </button>
              <span className="px-3 py-1 font-semibold min-w-[30px] text-center">{quantity}</span>
              <button
                onClick={incrementQty}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row mt-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* Extra Delivery Info */}
          <div className="mt-6 text-sm text-gray-500 space-y-2">
            <p>✅ Free delivery on orders over $50</p>
            <p>🔄 30-Day Return Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
