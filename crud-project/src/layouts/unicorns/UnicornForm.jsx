import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import * as Yup from 'yup';


const UnicornForm = ({ initialValues, onSubmit, editingUnicorn, cancelEdit }) => {

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(6, 'Debe tener mínimo 6 caracteres')
            .max(20, 'Debe tener menos de 20 caracteres')
            .required('Nombre es obligatorio'),
        age: Yup.number().required('Edad es obligatorio'),
        color: Yup.string().required('Color es obligatorio'),
        power: Yup.string().required('Poder es obligatorio'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ resetForm }) => (
                <Form className="mb-10">
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
                    <div className="flex gap-2 mt-4">
                        <Button
                            style={{ backgroundColor: '#3FAB37', border: 'none', color: '#fff' }}
                            label={editingUnicorn ? 'Editar unicornio' : 'Crear unicornio'}
                            type='submit'
                        />
                        {editingUnicorn && (
                            <Button
                                label="Cancelar"
                                style={{ backgroundColor: '#21C615', border: 'none', color: '#fff' }}
                                className="p-button-secondary"
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

export default UnicornForm;
