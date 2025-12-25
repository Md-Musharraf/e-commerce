import { useDispatch, useSelector } from "react-redux";
import { decreseItem, increseItem, removeProductFromCart } from "../../redux/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.value?.cart || []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-xl font-semibold">
        🛒 Your cart is empty
      </div>
    );
  }

  const cartDeleteHandler = (data) => {
    dispatch(removeProductFromCart(data));
  };

  const increseQuantity = (item) => {
    dispatch(increseItem(item, 1));
  };

  const decreseQuantity = (item) => {
    dispatch(decreseItem(item));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border rounded-xl p-4 shadow-sm"
          >
            {/* IMAGE SECTION */}
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
              <p className="mt-1 font-medium">₹ {item.price}</p>
            </div>

            {/* QUANTITY CONTROLS */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreseQuantity(item)}
                className={
                  item.quantity <= 1
                    ? "text-gray-900/50 px-3 py-1 border rounded-md"
                    : "px-3 py-1 border rounded-md hover:bg-gray-100"
                }
                disabled={item.quantity === 1}
              >
                −
              </button>

              <span className="w-6 text-center font-medium">{item.quantity}</span>

              <button
                onClick={() => increseQuantity(item)}
                className="px-3 py-1 border rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* ITEM TOTAL */}
            <div className="font-semibold w-24 text-right">
              ₹ {(item.price * item.quantity).toFixed(2)}
            </div>

            {/* DELETE */}
            <button
              className="text-red-500 hover:text-red-700 font-medium"
              onClick={() => cartDeleteHandler(item)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h2 className="text-xl font-semibold">Total</h2>
        <h2 className="text-xl font-bold">₹ {totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
