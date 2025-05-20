import { Routes, Route, Link } from "react-router-dom";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";

function ProductsContainer() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <nav className="mb-6">
                <Link to="/" className="text-green-400 hover:underline">← Volver al Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={<ProductsView />} />
                <Route path="/crear" element={<ProductForm />} />
                <Route path="/editar/:id" element={<ProductForm />} />
            </Routes>
        </div>
    );
}

export default ProductsContainer;
