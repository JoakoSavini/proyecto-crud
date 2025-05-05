import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UnicornContext } from "../../context/UnicornContext";
import UnicornForm from './UnicornForm';
import { exportPdf } from '../../utils/exportPdf';

const UnicornsView = () => {
    const { unicorns, deleteUnicorn, createUnicorn, updateUnicorn } = useContext(UnicornContext);
    const [editingUnicorn, setEditingUnicorn] = useState(null);

    const initialValues = editingUnicorn || {
        name: '',
        age: '',
        color: '',
        power: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        if (editingUnicorn) {
            updateUnicorn({ ...values, _id: editingUnicorn._id });
        } else {
            createUnicorn(values);
        }
        resetForm();
        setEditingUnicorn(null);
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => setEditingUnicorn(rowData)}
                style={{ backgroundColor: '#f0ad4e', border: 'none', color: '#000' }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => deleteUnicorn(rowData._id)}
                style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
            />
        </div>
    );

    const columns = ["Nombre", "Edad", "Color", "Poder"]

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
    <h2 className="text-3xl mb-8">🦄 Gestión de Unicornios</h2>

    {/* Formulario */}
    <div className="w-full flex justify-center mb-8">
    <div className="w-full max-w-md">
        <UnicornForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            editingUnicorn={editingUnicorn}
            cancelEdit={() => setEditingUnicorn(null)}
        />
    </div>
</div>


    {/* Botón Exportar */}
    <div className="mb-8">
        <Button
            label="Exportar PDF"
            style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
            className="p-button-secondary"
            onClick={() => {
                exportPdf(unicorns, 'Unicornios', columns)
            }}
            type="button"
        />
    </div>

    {/* Tabla */}
    <div className="w-full max-w-4xl">
        <DataTable
            value={unicorns}
            tableStyle={{ minWidth: '50rem' }}
            className="p-datatable-sm"
            rowClassName={() => 'custom-row-spacing'} 
        >
            <Column field="name" header="Nombre" />
            <Column field="age" header="Edad" />
            <Column field="color" header="Color" />
            <Column field="power" header="Poder" />
            <Column
                body={actionBodyTemplate}
                header="Acciones"
                style={{ width: '12rem' }}
            />
        </DataTable>
    </div>
</div>


    );
};

export default UnicornsView;
