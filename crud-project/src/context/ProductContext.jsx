import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const API_URL = 'http://localhost:3001/productos';
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    // Obtener todos los Productos
    const getProducts = async () => {
        try {
            const { data } = await axios.get(API_URL);
            console.log('Productos recibidos:', data);
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener Productos:', error);
        }
    };


    // Crear Producto
    const createProduct = async (product) => {
        try {
            await axios.post(API_URL, product);
            await getProducts();
            navigate('/productos');
        } catch (error) {
            console.error('Error al crear Producto:', error);
        }
    };

    // Actualizar Product
    const updateProduct = async (product) => {
        try {
            await axios.put(`${API_URL}/${product.id}`, product);
            setEditingProduct(null);
            await getProducts();
            navigate('/productos');
        } catch (error) {
            console.error('Error al actualizar Producto:', error);
        }
    };


    // Eliminar Producto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await getProducts();
        } catch (error) {
            console.error('Error al eliminar Producto:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                editingProduct,
                setEditingProduct,
                createProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
