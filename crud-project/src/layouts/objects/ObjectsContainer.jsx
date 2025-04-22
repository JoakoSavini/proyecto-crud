import React, { useEffect, useState, useContext } from 'react';
import ObjectsView from './ObjectsView';

const API_URL = 'https://crudcrud.com/api/884d7e5200f94d2ea1c4688026a1b8d0/unicorns';

const ObjectsContainer = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        colour: '',
        power: '',
    });
    const [editingUnicorn, setEditingUnicorn] = useState(null);

    // POST - Crear
    const handleCreate = async () => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setFormData({ name: '', age: '', colour: '', power: '' });

            }
        } catch (err) {
            console.error('Error al crear unicornio:', err);
        }
    };

    // PUT - Actualizar
    const handleUpdate = async () => {
        if (!editingUnicorn) return;
        try {
            await fetch(`${API_URL}/${editingUnicorn._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    age: formData.age,
                    colour: formData.colour,
                    power: formData.power,
                }),
            });
            setEditingUnicorn(null);
            setFormData({ name: '', age: '', colour: '', power: '' });

        } catch (err) {
            console.error('Error al actualizar unicornio:', err);
        }
    };

    // DELETE - Eliminar
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        } catch (err) {
            console.error('Error al eliminar unicornio:', err);
        }
    };

    // Iniciar edición
    const startEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
        setFormData({
            name: unicorn.name || '',
            age: unicorn.age || '',
            colour: unicorn.colour || '',
            power: unicorn.power || '', // 🆕 Cargar poder también
        });
    };

    return (
        <ObjectsView
            formData={formData}
            setFormData={setFormData}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            editingUnicorn={editingUnicorn}
            startEdit={startEdit}
        />
    );
};

export default ObjectsContainer;