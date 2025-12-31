import { useEffect, useState } from "react";
import axios from "../axios/api";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { getProduct } from "../redux/productSlice";
import { syncUser } from "../redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.value);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    dispatch(syncUser());
  }, [dispatch]);

  useEffect(() => {
    // Get total product count from API
    const fetchCount = async () => {
      const res = await axios.get("/products");

      setTotalCount(res.data.length);
    };
    fetchCount();
    dispatch(getProduct(products));
  }, []);

  const fetchMoreData = () => {
    if (totalCount !== null && products.length >= totalCount) {
      setHasMore(false);
      return;
    }
    dispatch(getProduct(products));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center my-6 text-gray-600">Loading more products...</h4>}
        endMessage={
          <p className="text-center my-6 text-gray-500">
            <b>Yay! You have seen it all 🎉</b>
          </p>
        }
      >
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product.detail/${product.id}`}
              state={product}
              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5
                         max-w-xs bg-white rounded-lg border
                         hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-60 p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain
                             group-hover:scale-105 transition"
                />
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-sm text-gray-700 font-medium truncate mb-2">{product.title}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                    {product.rating?.rate} ★
                  </span>
                  <span className="text-xs text-gray-500">({product.rating?.count})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-green-600 font-semibold">10% off</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
