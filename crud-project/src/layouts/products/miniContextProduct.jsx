import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
    const API_URL = 'https://crudcrud.com/api/85aea305784f430f8f09b953631471d4/Products';
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setProducts(data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const createProduct = async (product) => {
        try {
            await axios.post(API_URL, product);
            getProducts();
            navigate('');
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const updateProduct = async (product) => {
        try {
            await axios.delete(`${API_URL}/${product._id}`);
            await axios.post(API_URL, {
                name: product.name,
                age: product.age,
                color: product.color,
                power: product.power,
            });
            setEditingProduct(null);
            getProducts();
            navigate('');
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            getProducts();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
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
