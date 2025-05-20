import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersContainer from "./layouts/users";
import ProductsContainer from "./layouts/products";
import Home from "./layouts/Home";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usuarios/*" element={<UsersContainer />} />
            <Route path="/productos/*" element={<ProductsContainer />} />
          </Routes>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
