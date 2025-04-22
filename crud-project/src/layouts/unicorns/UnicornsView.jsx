import React, { useContext } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UnicornContext } from "../../context/UnicornContext";
import { useNavigate } from 'react-router-dom';

const UnicornsView = () => {
    const { unicorns, deleteUnicorn } = useContext(UnicornContext);
    const navigate = useNavigate();

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => navigate(`/unicornios/editar/${rowData._id}`)}
                style={{
                    backgroundColor: '#f0ad4e',
                    border: 'none',
                    color: '#000',
                }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => deleteUnicorn(rowData._id)}
                style={{
                    backgroundColor: '#d9534f',
                    border: 'none',
                    color: '#fff',
                }}
            />
        </div>
    );

    return (
        <div
            className="p-6"
            style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
        >
            <h2 className="text-2xl mb-8"> 🦄 Gestión de Unicornios</h2>

            <div style={{ marginTop: '2rem' }}>
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
        </div>
    );
};

export default UnicornsView;
