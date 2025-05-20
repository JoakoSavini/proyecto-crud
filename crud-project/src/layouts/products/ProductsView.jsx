import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductContext } from '../../context/ProductContext';
import ProductForm from './ProductForm';
import { exportProductsPdf } from '../../utils/exportProductsPdf';

const ProductsView = () => {
    const { products, deleteProduct, createProduct, updateProduct } = useContext(ProductContext);
    const [editingProduct, setEditingProduct] = useState(null);

    const initialValues = editingProduct || {
        name: '',
        price: '',
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

    const columns = ['Nombre', 'Precio'];

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <h2 className="text-3xl mb-8">📦 Gestión de Productos</h2>

            <div className="w-full flex justify-center mb-8">
                <div className="w-full max-w-md">
                    <ProductForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        editingProduct={editingProduct}
                        cancelEdit={() => setEditingProduct(null)}
                    />
                </div>
            </div>

            <div className="mb-8">
                <Button
                    label="Exportar PDF"
                    style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
                    onClick={() => exportProductsPdf(products, 'Productos', columns)}
                    type="button"
                />
            </div>

            <div className="w-full max-w-4xl">
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }} className="p-datatable-sm">
                    <Column field="name" header="Nombre" />
                    <Column field="price" header="Precio" />
                    <Column body={actionBodyTemplate} header="Acciones" style={{ width: '12rem' }} />
                </DataTable>
            </div>
        </div>
    );
};

export default ProductsView;
