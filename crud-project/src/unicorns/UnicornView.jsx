// src/views/UnicornView.jsx
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const UnicornView = ({
    unicorns,
    loading,
    showModal,
    newUnicorn,
    editingUnicorn,
    onInputChange,
    onAdd,
    onEdit,
    onDelete,
    onOpenAdd,
    onOpenEdit,
    onCloseModal
}) => {
    return (
        <div className="p-4">
            <h2>🦄 Lista de Unicornios</h2>
            <Button label="Agregar Unicornio" icon="pi pi-plus" onClick={onOpenAdd} className="mb-3" />

            {loading ? (
                <p>Cargando...</p>
            ) : (
                unicorns.map((u) => (
                    <div key={u._id} className="card p-3 mb-2">
                        <p><strong>Nombre:</strong> {u.name}</p>
                        <p><strong>Color:</strong> {u.color}</p>
                        <p><strong>Edad:</strong> {u.age}</p>
                        <p><strong>Poder:</strong> {u.power}</p>
                        <Button label="Editar" icon="pi pi-pencil" className="mr-2" onClick={() => onOpenEdit(u)} />
                        <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={() => onDelete(u._id)} />
                    </div>
                ))
            )}

            <Dialog
                header={editingUnicorn ? "Editar Unicornio" : "Agregar Unicornio"}
                visible={showModal}
                style={{ width: '400px' }}
                onHide={onCloseModal}
            >
                <div className="p-fluid">
                    <div className="field">
                        <label>Nombre</label>
                        <InputText name="name" value={newUnicorn.name} onChange={onInputChange} />
                    </div>
                    <div className="field">
                        <label>Color</label>
                        <InputText name="color" value={newUnicorn.color} onChange={onInputChange} />
                    </div>
                    <div className="field">
                        <label>Edad</label>
                        <InputText type="number" name="age" value={newUnicorn.age ?? ''} onChange={onInputChange} />
                    </div>
                    <div className="field">
                        <label>Poder</label>
                        <InputText name="power" value={newUnicorn.power} onChange={onInputChange} />
                    </div>
                </div>

                <div className="mt-3 text-right">
                    <Button label="Cancelar" className="p-button-text mr-2" onClick={onCloseModal} />
                    <Button label={editingUnicorn ? "Guardar Cambios" : "Agregar"} onClick={editingUnicorn ? onEdit : onAdd} />
                </div>
            </Dialog>
        </div>
    );
};

export default UnicornView;
