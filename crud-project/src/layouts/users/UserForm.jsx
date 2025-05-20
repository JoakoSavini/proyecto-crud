import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';

const UserForm = ({ initialValues, onSubmit, editingUser, cancelEdit }) => {
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Debe tener mínimo 3 caracteres')
            .max(20, 'Debe tener menos de 20 caracteres')
            .required('Nombre es obligatorio'),
        email: Yup.string().email('Email inválido').required('Email es obligatorio'),
        age: Yup.number().required('Edad es obligatoria').positive().integer(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ resetForm }) => (
                <Form className="flex flex-col gap-4 p-6 bg-gray-900 rounded-lg shadow-lg w-full">
                    <div className="flex flex-col">
                        <label>Nombre</label>
                        <Field name="name" className="p-2 rounded bg-gray-800 text-white" />
                        <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
                    </div>

                    <div className="flex flex-col">
                        <label>Email</label>
                        <Field name="email" className="p-2 rounded bg-gray-800 text-white" />
                        <ErrorMessage name="email" component="div" className="text-red-400 text-sm" />
                    </div>

                    <div className="flex flex-col">
                        <label>Edad</label>
                        <Field name="age" type="number" className="p-2 rounded bg-gray-800 text-white" />
                        <ErrorMessage name="age" component="div" className="text-red-400 text-sm" />
                    </div>

                    <div className="flex gap-2 mt-4 justify-center">
                        <Button
                            style={{ backgroundColor: '#3FAB37', border: 'none', color: '#fff' }}
                            label={editingUser ? 'Editar usuario' : 'Crear usuario'}
                            type="submit"
                        />
                        {editingUser && (
                            <Button
                                label="Cancelar"
                                style={{ backgroundColor: '#21C615', border: 'none', color: '#fff' }}
                                onClick={() => {
                                    cancelEdit();
                                    resetForm();
                                }}
                                type="button"
                            />
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UserForm;
