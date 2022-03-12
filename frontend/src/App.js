import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import LoginForm from "./Component/Form/Form.js";
import Products from "./Component/Product/Product.js";
function App() {
  return (
    <div>
      <h1 className="d-flex justify-content-center">Xceltech</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
