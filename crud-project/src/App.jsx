import UsersContainer from "./layouts/users";
import ProductsContainer from "./layouts/products";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <UsersContainer />
          <ProductsContainer />
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
