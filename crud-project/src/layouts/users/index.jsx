import { Routes, Route, Link } from "react-router-dom";
import UsersView from "./UsersView";
import UserForm from "./UserForm";

function UsersContainer() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <nav className="mb-6">
                <Link to="/" className="text-indigo-400 hover:underline">← Volver al Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={<UsersView />} />
                <Route path="/crear" element={<UserForm />} />
                <Route path="/editar/:id" element={<UserForm />} />
            </Routes>
        </div>
    );
}

export default UsersContainer;
