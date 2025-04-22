// src/hooks/useUnicornForm.js
import { useState } from 'react';

export const useUnicornForm = (getUnicorns, apiUrl) => {
    const [editingUnicorn, setEditingUnicorn] = useState(null);

    const handleCreate = async (values) => {
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (res.ok) getUnicorns();
        } catch (err) {
            console.error('Error al crear unicornio:', err);
        }
    };

    const handleUpdate = async (values) => {
        if (!editingUnicorn) return;
        try {
            await fetch(`${apiUrl}/${editingUnicorn._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            setEditingUnicorn(null);
            getUnicorns();
        } catch (err) {
            console.error('Error al actualizar unicornio:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
            getUnicorns();
        } catch (err) {
            console.error('Error al eliminar unicornio:', err);
        }
    };

    const startEdit = (unicorn) => setEditingUnicorn(unicorn);

    const initialValues = {
        name: editingUnicorn?.name || '',
        color: editingUnicorn?.color || '',
        age: editingUnicorn?.age || '',
        power: editingUnicorn?.power || ''
    };

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        editingUnicorn,
        startEdit,
        initialValues
    };
};
