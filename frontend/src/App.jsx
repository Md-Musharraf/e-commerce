import Nav from "./pages/Nav";
import MainRouter from "./router/MainRouter";

const App = () => {
  return (
    <div className="w-full h-screen max-h-full bg-gray-50 text-gray-900 ">
      <Nav />
      <MainRouter />
    </div>
  );
};

export default App;
