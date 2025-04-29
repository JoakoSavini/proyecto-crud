import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const navigate = useNavigate();

    return (
        <div
            className="p-6 flex flex-col items-center gap-6"
            style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
        >
            <h1 className="text-3xl mb-8">🌟 Bienvenido al Panel</h1>

            <div className="flex gap-6">
                <Button
                    label="🦄 Unicornios"
                    className="p-button-lg p-button-outlined"
                    onClick={() => navigate('/unicornios')}
                    style={{ borderColor: '#f0ad4e', color: '#f0ad4e' }}
                />
                <Button
                    label="📦 Productos"
                    className="p-button-lg p-button-outlined"
                    onClick={() => navigate('/productos')}
                    style={{ borderColor: '#5bc0de', color: '#5bc0de' }}
                />
            </div>
        </div>
    );
};

export default HomeView;
