import { useDispatch } from "react-redux";
import Nav from "./pages/Nav";
import { getProduct } from "./redux/productSlice";
import { syncUser } from "./redux/userSlice";
import MainRouter from "./router/MainRouter";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(syncUser());
  }, []);

  return (
    <div className="w-full h-screen max-h-full bg-gray-50 text-gray-900 ">
      <Nav />
      <MainRouter />
    </div>
  );
};

export default App;
