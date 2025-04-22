import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/products';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
    };

    const deleteProduct = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    const actionTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => navigate(`/productos/editar/${rowData._id}`)}
                style={{ backgroundColor: '#f0ad4e', border: 'none', color: '#000' }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => deleteProduct(rowData._id)}
                style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
            />
        </div>
    );

    return (
        <div className="p-6" style={{ backgroundColor: '#121212', color: 'white' }}>
            <h2 className="text-2xl mb-8">📦 Lista de Productos</h2>
            <DataTable value={products}>
                <Column field="name" header="Nombre" />
                <Column field="price" header="Precio" />
                <Column field="stock" header="Stock" />
                <Column body={actionTemplate} header="Acciones" />
            </DataTable>
        </div>
    );
};

export default ProductView;
