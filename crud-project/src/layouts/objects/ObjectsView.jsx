import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-dark-indigo/theme.css'; // Tema oscuro
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ObjectsView = ({
    unicorns,
    formData,
    setFormData,
    handleCreate,
    handleUpdate,
    handleDelete,
    editingUnicorn,
    startEdit,
}) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => startEdit(rowData)}
                style={{
                    backgroundColor: '#f0ad4e',
                    border: 'none',
                    color: '#000',
                }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => handleDelete(rowData._id)}
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

            {/* Formulario */}
            <div
                className="formulario-container"
                style={{
                    backgroundColor: '#1e1e1e',
                    padding: '2rem',
                    borderRadius: '12px',
                    maxWidth: '700px',
                    marginBottom: '3rem',
                }}
            >
                <div
                    className="form-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    <div>
                        <span className="p-float-label w-full">
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full"
                            />
                            <label htmlFor="name">Nombre</label>
                        </span>
                    </div>

                    <div>
                        <span className="p-float-label w-full">
                            <InputText
                                id="age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full"
                            />
                            <label htmlFor="age">Edad</label>
                        </span>
                    </div>

                    <div>
                        <span className="p-float-label w-full">
                            <InputText
                                id="colour"
                                name="colour"
                                value={formData.colour}
                                onChange={handleChange}
                                className="w-full"
                            />
                            <label htmlFor="colour">Color</label>
                        </span>
                    </div>

                    <div>
                        <span className="p-float-label w-full">
                            <InputText
                                id="power"
                                name="power"
                                value={formData.power}
                                onChange={handleChange}
                                className="w-full"
                            />
                            <label htmlFor="power">Poder</label>
                        </span>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        label={editingUnicorn ? "Actualizar Unicornio" : "Crear Unicornio"}
                        icon={editingUnicorn ? "pi pi-save" : "pi pi-plus"}
                        onClick={editingUnicorn ? handleUpdate : handleCreate}
                        disabled={!formData.name || !formData.age || !formData.colour || !formData.power}
                        style={{
                            backgroundColor: '#00bcd4',
                            border: 'none',
                            color: '#000',
                            fontWeight: 'bold',
                            width: '100%',
                            padding: '0.75rem',
                            marginTop: '2rem',
                        }}
                    />
                </div>
            </div>

            {/* Tabla */}
            <div style={{ marginTop: '2rem' }}>
                <DataTable
                    value={unicorns}
                    tableStyle={{ minWidth: '50rem' }}
                    className="p-datatable-sm"
                >
                    <Column field="name" header="Nombre" style={{ color: '#fff' }}></Column>
                    <Column field="age" header="Edad"></Column>
                    <Column field="colour" header="Color"></Column>
                    <Column field="power" header="Poder"></Column>
                    <Column
                        body={actionBodyTemplate}
                        header="Acciones"
                        style={{ width: '12rem' }}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default ObjectsView;