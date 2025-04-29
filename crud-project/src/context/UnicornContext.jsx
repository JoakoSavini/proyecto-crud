import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UnicornContext = createContext();
export const UnicornProvider = ({ children }) => {
    const API_URL = 'https://crudcrud.com/api/85aea305784f430f8f09b953631471d4/unicorns';
    const [unicorns, setUnicorns] = useState([]);
    const [editingUnicorn, setEditingUnicorn] = useState(null);
    const navigate = useNavigate();

    const getUnicorns = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setUnicorns(data);
        } catch (error) {
            console.error('Error al obtener unicornios:', error);
        }
    };

    const createUnicorn = async (unicorn) => {
        try {
            await axios.post(API_URL, unicorn);
            getUnicorns();
            navigate('');
        } catch (error) {
            console.error('Error al crear unicornio:', error);
        }
    };

    const updateUnicorn = async (unicorn) => {
        try {
            await axios.delete(`${API_URL}/${unicorn._id}`);
            await axios.post(API_URL, {
                name: unicorn.name,
                age: unicorn.age,
                color: unicorn.color,
                power: unicorn.power,
            });
            setEditingUnicorn(null);
            getUnicorns();
            navigate('');
        } catch (error) {
            console.error('Error al actualizar unicornio:', error);
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
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
