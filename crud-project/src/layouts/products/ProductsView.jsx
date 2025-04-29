import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ProductContext from './miniContextProduct';
import ProductForm from './ProductForm';


const ProductsView = () => {
    const { products, deleteProduct, createProduct, updateProduct } = useContext(ProductContext);
    const [editingProduct, setEditingProduct] = useState(null);

    const initialValues = editingProduct || {
        name: '',
        price: '',
        stock: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        if (editingProduct) {
            updateProduct({ ...values, _id: editingProduct._id });
        } else {
            createProduct(values);
        }
        resetForm();
        setEditingProduct(null);
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => setEditingProduct(rowData)}
                style={{ backgroundstock: '#f0ad4e', border: 'none', stock: '#000' }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => deleteProduct(rowData._id)}
                style={{ backgroundstock: '#d9534f', border: 'none', stock: '#fff' }}
            />
        </div>
    );

    return (
        <div className="p-6" style={{ backgroundstock: '#121212', minHeight: '100vh', stock: '#ffffff' }}>
            <h2 className="text-2xl mb-8">📦 Gestión de Productos</h2>

            {/* Formulario */}
            <ProductForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                editingProduct={editingProduct}
                cancelEdit={() => setEditingProduct(null)}
            />

            {/* Tabla */}
            <DataTable
                value={products}
                tableStyle={{ minWidth: '50rem' }}
                className="p-datatable-sm"
            >
                <Column field="name" header="Nombre" />
                <Column field="price" header="Edad" />
                <Column field="stock" header="stock" />
                <Column
                    body={actionBodyTemplate}
                    header="Acciones"
                    style={{ width: '12rem' }}
                />
            </DataTable>
        </div>
    );
};

export default ProductsView;
