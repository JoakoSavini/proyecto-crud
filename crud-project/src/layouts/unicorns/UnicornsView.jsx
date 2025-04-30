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
        <div className="p-6" style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}>
            <h2 className="text-2xl mb-8">🦄 Gestión de Unicornios</h2>

            {/* Formulario */}
            <UnicornForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                editingUnicorn={editingUnicorn}
                cancelEdit={() => setEditingUnicorn(null)}
            />

            {/* Tabla */}
            <Button
                label="Exportar PDF"
                className="p-button-secondary"
                onClick={() => {
                    exportPdf(unicorns, 'Unicornios', columns)
                }}
                type="button"
            />
            <DataTable
                value={unicorns}
                tableStyle={{ minWidth: '50rem' }}
                className="p-datatable-sm"
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

    );
};

export default UnicornsView;
