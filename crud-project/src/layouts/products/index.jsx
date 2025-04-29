import { Routes, Route } from "react-router-dom";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";
import { ProductProvider } from "./miniContextProduct";

export default function ProductRoutes() {
    return (
        <ProductProvider>   
            <Routes>
                <Route path="/" element={<ProductsView />} />
                <Route path="/crear" element={<ProductForm />} />
                <Route path="/editar/:id" element={<ProductForm />} />
            </Routes>
        </ProductProvider>
    );
}
