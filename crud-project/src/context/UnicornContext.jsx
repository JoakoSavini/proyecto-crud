import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UnicornContext = createContext();

export const UnicornProvider = ({ children }) => {
    const API_URL = '/api/unicorns';
    const [unicorns, setUnicorns] = useState([]);
    const [editingUnicorn, setEditingUnicorn] = useState(null);
    const navigate = useNavigate();

    // Obtener todos los unicornios
    const getUnicorns = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setUnicorns(data);
        } catch (error) {
            console.error('Error al obtener unicornios:', error);
        }
    };

    // Crear unicornio
    const createUnicorn = async (unicorn) => {
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(unicorn),
            });
            getUnicorns();
            navigate('/unicornios');
        } catch (error) {
            console.error('Error al crear unicornio:', error);
        }
    };

    // Actualizar unicornio
    const updateUnicorn = async (unicorn) => {
        try {
            await fetch(`${API_URL}/${unicorn._id}`, { method: 'DELETE' });

            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: unicorn.name,
                    age: unicorn.age,
                    color: unicorn.color,
                    power: unicorn.power,
                }),
            });

            setEditingUnicorn(null);
            getUnicorns();
            navigate('/unicornios');
        } catch (error) {
            console.error('Error al actualizar unicornio:', error);
        }
    };

    // Eliminar unicornio
    const deleteUnicorn = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            getUnicorns();
        } catch (error) {
            console.error('Error al eliminar unicornio:', error);
        }
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider
            value={{
                unicorns,
                editingUnicorn,
                setEditingUnicorn,
                createUnicorn,
                updateUnicorn,
                deleteUnicorn,
            }}
        >
            {children}
        </UnicornContext.Provider>
    );
};
