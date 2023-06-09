import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Footer from "./components/Footer";
import ProductPage from "./components/ProductPage";
import Documentation from "./components/Documentation";
import ErrorPage from "./components/ErrorPage";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProductPage />}></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>

          {/* <Route  path="/documentation" element={ <Documentation />}></Route> */}

          <Route path="/documentation">
            <Route
              path="/documentation/:productid"
              element= {< Documentation />}>
            </Route>
            {/* <Route
              path="/documentation/2"
              element={<Documentation endpoint={endpoint2} homepoint={""}/>}
            ></Route> */}
            <Route
              path="/documentation/:productid/:id"
              element={<Documentation />}
            >
            </Route>
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
