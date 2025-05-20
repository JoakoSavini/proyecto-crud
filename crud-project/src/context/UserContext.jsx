import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const API_URL = 'http://localhost:3000/usuarios';
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const navigate = useNavigate();

    // Obtener todos los Users
    const getUsers = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setUsers(data);
        } catch (error) {
            console.error('Error al obtener Users:', error);
        }
    };

    // Crear Users
    const createUser = async (user) => {
        try {
            await axios.post(API_URL, user);
            await getUsers();
            navigate('');
        } catch (error) {
            console.error('Error al crear Users:', error);
        }
    };

    // Actualizar Users (CrudCrud no permite PUT, así que se borra y se crea)
    const updateUser = async (user) => {
        try {
            await axios.delete(`${API_URL}/${user._id}`);

            await axios.post(API_URL, {
                name: user.name,
                email: user.email,
                age: user.age,
            });

            setEditingUser(null);
            await getUsers();
            navigate('');
        } catch (error) {
            console.error('Error al actualizar Users:', error);
        }
    };

    // Eliminar Users
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            await getUsers();
        } catch (error) {
            console.error('Error al eliminar Users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <UserContext.Provider
            value={{
                users,
                editingUser,
                setEditingUser,
                createUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
