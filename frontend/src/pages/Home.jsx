import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.product.value);

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Container: Flex-wrap with centering and gap */}
      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <Link
            state={product}
            to={`/product.detail/${product.id}`} // Takes user to details page
            key={product.id}
            // Card Styles:
            // - Fixed width on mobile, responsive width on larger screens
            // - White background, rounded corners
            // - Hover: Shadow and slight lift (transform)
            className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 
                       max-w-xs bg-white rounded-lg border border-gray-200 
                       hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image Section */}
            <div className="h-60 p-4 flex items-center justify-center relative">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details Section */}
            <div className="p-4">
              {/* Title: Truncated to 1 line */}
              <h3 className="text-gray-700 font-medium text-sm truncate mb-2">{product.title}</h3>

              {/* Rating Badge (Green Box) */}
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  {product.rating?.rate} ★
                </span>
                <span className="text-gray-500 text-xs font-medium">({product.rating?.count})</span>
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                {/* Mock Discount (Optional, to look like Flipkart) */}
                <span className="text-green-600 text-sm font-semibold">10% off</span>
              </div>

              {/* Free Delivery Tag */}
              <div className="mt-1">
                <span className="text-xs text-gray-500 border border-gray-300 rounded px-1">
                  Free Delivery
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
