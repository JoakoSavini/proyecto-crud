import React, { useContext, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserContext } from '../../context/UserContext';
import UserForm from './UserForm';
import { exportUsersPdf } from '../../utils/exportUsersPdf';

const UsersView = () => {
    const { users, deleteUser, createUser, updateUser } = useContext(UserContext);
    const [editingUser, setEditingUser] = useState(null);

    const initialValues = editingUser || {
        name: '',
        email: '',
        age: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        if (editingUser) {
            updateUser({ ...values, _id: editingUser._id });
        } else {
            createUser(values);
        }
        resetForm();
        setEditingUser(null);
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => setEditingUser(rowData)}
                style={{ backgroundColor: '#f0ad4e', border: 'none', color: '#000' }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => deleteUser(rowData._id)}
                style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
            />
        </div>
    );

    const columns = ['Nombre', 'Email', 'Edad'];

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <h2 className="text-3xl mb-8">👤 Gestión de Usuarios</h2>

            <div className="w-full flex justify-center mb-8">
                <div className="w-full max-w-md">
                    <UserForm
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        editingUser={editingUser}
                        cancelEdit={() => setEditingUser(null)}
                    />
                </div>
            </div>

            <div className="mb-8">
                <Button
                    label="Exportar PDF"
                    style={{ backgroundColor: '#d9534f', border: 'none', color: '#fff' }}
                    onClick={() => exportUsersPdf(users, 'Usuarios', columns)}
                    type="button"
                />
            </div>

            <div className="w-full max-w-4xl">
                <DataTable value={users || []}  tableStyle={{ minWidth: '50rem' }} className="p-datatable-sm">
                    <Column field="name" header="Nombre" />
                    <Column field="email" header="Email" />
                    <Column field="age" header="Edad" />
                    <Column body={actionBodyTemplate} header="Acciones" style={{ width: '12rem' }} />
                </DataTable>
            </div>
        </div>
    );
};

export default UsersView;
