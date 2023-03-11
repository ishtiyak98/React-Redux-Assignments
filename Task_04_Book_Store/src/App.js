import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import StorePage from "./components/StorePage/StorePage";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar></Navbar>
        <StorePage></StorePage>
      </Provider>
    </>
  );
}

export default App;
