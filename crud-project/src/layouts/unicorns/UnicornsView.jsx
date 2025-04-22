import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const UnicornsView = ({
    unicorns,
    formData,
    setFormData,
    handleCreate,
    handleUpdate,
    handleDelete,
    editingUnicorn,
    startEdit,
    initialValues 
}) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(6, 'Debe tener minimo 6 caracteres')
            .max(20, 'Debe tener menos de 20 caracteres')
            .required('Nombre es obligatorio'),
        age: Yup.number()
            .required('Edad es obligatorio'),
        color: Yup.string()
            .required('Color es obligatorio'),
        power: Yup.string()
            .required('Poder es obligatorio'),
    })  

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                onClick={() => startEdit(rowData)}
                style={{
                    backgroundColor: '#f0ad4e',
                    border: 'none',
                    color: '#000',
                }}
            />
            <Button
                label="Eliminar"
                icon="pi pi-trash"
                onClick={() => handleDelete(rowData._id)}
                style={{
                    backgroundColor: '#d9534f',
                    border: 'none',
                    color: '#fff',
                }}
            />
        </div>
    );

    console.log("initialValues", initialValues);


    return (
        <div
            className="p-6"
            style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#ffffff' }}
        >
            <h2 className="text-2xl mb-8"> 🦄 Gestión de Unicornios</h2>

            {/* Formulario */}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={editingUnicorn ? handleUpdate : handleCreate}
                enableReinitialize
            >
                <Form>
                    <div>
                        <label>Nombre</label>
                        <Field name='name' />
                        <ErrorMessage name="name" component='div' />
                    </div>
                    <div>
                        <label>Edad</label>
                        <Field name='age' />
                        <ErrorMessage name="age" component='div' />
                    </div>
                    <div>
                        <label>Color</label>
                        <Field name='color' />
                        <ErrorMessage name="color" component='div' />
                    </div>
                    <div>
                        <label>Poder</label>
                        <Field name='power' />
                        <ErrorMessage name="power" component='div' />
                    </div>
                    <Button style={{ color: 'white' }} label={editingUnicorn ? 'Editar unicornio' : 'Crear unicornio'} type='submit'></Button>
                </Form>
            </Formik>

            {/* <div
        className="formulario-container"
        style={{
          backgroundColor: '#1e1e1e',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '700px',
          marginBottom: '3rem',
        }}
      >
        <div
          className="form-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div>
            <span className="p-float-label w-full">
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
              <label htmlFor="name">Nombre</label>
            </span>
          </div>

          <div>
            <span className="p-float-label w-full">
              <InputText
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full"
              />
              <label htmlFor="age">Edad</label>
            </span>
          </div>

          <div>
            <span className="p-float-label w-full">
              <InputText
                id="colour"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                className="w-full"
              />
              <label htmlFor="colour">Color</label>
            </span>
          </div>

          <div>
            <span className="p-float-label w-full">
              <InputText
                id="power"
                name="power"
                value={formData.power}
                onChange={handleChange}
                className="w-full"
              />
              <label htmlFor="power">Poder</label>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            label={editingUnicorn ? "Actualizar Unicornio" : "Crear Unicornio"}
            icon={editingUnicorn ? "pi pi-save" : "pi pi-plus"}
            onClick={editingUnicorn ? handleUpdate : handleCreate}
            disabled={!formData.name || !formData.age || !formData.colour || !formData.power}
            style={{
              backgroundColor: '#00bcd4',
              border: 'none',
              color: '#000',
              fontWeight: 'bold',
              width: '100%',
              padding: '0.75rem',
              marginTop: '2rem',
            }}
          />
        </div>
      </div> */}

            {/* Tabla */}
            <div style={{ marginTop: '2rem' }}>
                <DataTable
                    value={unicorns}
                    tableStyle={{ minWidth: '50rem' }}
                    className="p-datatable-sm"
                >
                    <Column field="name" header="Nombre" style={{ color: '#fff' }}></Column>
                    <Column field="age" header="Edad"></Column>
                    <Column field="color" header="Color"></Column>
                    <Column field="power" header="Poder"></Column>
                    <Column
                        body={actionBodyTemplate}
                        header="Acciones"
                        style={{ width: '12rem' }}
                    ></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default UnicornsView;