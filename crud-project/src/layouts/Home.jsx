import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-8">Sistema de Gestión</h1>
            <div className="flex space-x-6">
                <Link
                    to="/usuarios"
                    className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-500 transition"
                >
                    Usuarios
                </Link>
                <Link
                    to="/productos"
                    className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 transition"
                >
                    Productos
                </Link>
            </div>
        </div>
    );
}

export default Home;
