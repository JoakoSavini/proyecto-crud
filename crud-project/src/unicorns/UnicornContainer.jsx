// src/containers/UnicornContainer.jsx
import { useEffect, useState } from "react";
import UnicornView from "./UnicornView";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const UnicornContainer = () => {
    const API_URL = 'https://crudcrud.com/api/b8a780b5682544559a850cc62d18bbcb/unicorns';

    const [dataUnicorn, setDataUnicorn] = useState([]);
    const [loadingUnicorn, setLoadingUnicorn] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUnicorn, setEditingUnicorn] = useState(null);

    const [newUnicorn, setNewUnicorn] = useState({
        name: '',
        color: '',
        age: null,
        power: ''
    });

    const fetchUnicorns = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setDataUnicorn(data);
            setLoadingUnicorn(false);
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        fetchUnicorns();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUnicorn((prev) => ({
            ...prev,
            [name]: name === 'age' ? (value === '' ? null : Number(value)) : value
        }));
    };

    const handleAddUnicorn = async () => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUnicorn)
            });
            if (res.ok) {
                fetchUnicorns();
                setShowModal(false);
                setNewUnicorn({ name: '', color: '', age: null, power: '' });
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleEditUnicorn = async () => {
        try {
            const res = await fetch(`${API_URL}/${editingUnicorn._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUnicorn)
            });
            if (res.ok) {
                fetchUnicorns();
                setShowModal(false);
                setEditingUnicorn(null);
                setNewUnicorn({ name: '', color: '', age: null, power: '' });
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleDeleteUnicorn = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            fetchUnicorns();
        } catch (e) {
            console.error(e.message);
        }
    };

    const openModalToAdd = () => {
        setEditingUnicorn(null);
        setNewUnicorn({ name: '', color: '', age: null, power: '' });
        setShowModal(true);
    };

    const openModalToEdit = (unicorn) => {
        setEditingUnicorn(unicorn);
        setNewUnicorn({
            name: unicorn.name,
            color: unicorn.color,
            age: unicorn.age,
            power: unicorn.power
        });
        setShowModal(true);
    };

    return (
        <UnicornView
            unicorns={dataUnicorn}
            loading={loadingUnicorn}
            showModal={showModal}
            newUnicorn={newUnicorn}
            editingUnicorn={editingUnicorn}
            onInputChange={handleInputChange}
            onAdd={handleAddUnicorn}
            onEdit={handleEditUnicorn}
            onDelete={handleDeleteUnicorn}
            onOpenAdd={openModalToAdd}
            onOpenEdit={openModalToEdit}
            onCloseModal={() => setShowModal(false)}
        />
    );
};

export default UnicornContainer;
